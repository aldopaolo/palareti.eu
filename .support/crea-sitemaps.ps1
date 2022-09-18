<#
per il parsing dell'html vedi
https://stackoverflow.com/questions/60655737/how-to-parse-html-table-with-powershell-core-7#:~:text=PowerShell%20%5BCore%5D%2C%20as%20of%207.2.1%2C%20does%20not%20come,PowerHTML%20module%20that%20wraps%20the%20HTML%20Agility%20Pack.
#>
# Install the module on demand
If (-not (Get-Module -ErrorAction Ignore -ListAvailable PowerHTML)) {
  Write-Verbose "Installing PowerHTML module for the current user..."
  Install-Module PowerHTML -ErrorAction Stop
}
Import-Module -ErrorAction Stop PowerHTML

## funzione per ripulire una stringa
function pulisciStringa{
  param(
    $stringa,
    [ValidateSet('normal', 'nowrap', 'pre-line', 'pre', 'pre-wrap', 'pre-wrap-auto')]$type='normal'
  )
  if(($type -eq 'normal') -or ($type -eq 'nowrap')){
    ## \t=\x09=TAB; \n=\x0A=LF; \r=\x0D=CR
    $ret=($stringa -replace "\t|\n|\r", " ").trim() -replace "  +", " "
  }
  elseif($type -eq 'pre-line'){
    $ret=($stringa -replace "\t", " ").trim() -replace "  +", " "
  }
  else{
    ## 'pre','pre-wrap','pre-wrap-auto'
    $ret=$stringa
  }
  return $ret
}

function getFileInfoWithExtension{
  param($path, $extension)
  Get-ChildItem -Path "$Path\*.$extension" `
  | ForEach-Object {
    $Name=$_.Name
    if($extension -like 'htm*'){
      ## se il file è HTML, estraggo il titolo da h1 o title
      $_content=Get-Content $_.fullname -Raw
      if($_content -match '(?is)<h1[^>]*>(.*)</h1'){
        ## (?is): case insensitive, considero `n un carattere comune
        $Titolo=pulisciStringa $matches[1]
      }
      elseif($_content -match '(?is)<title[^>]*>(.*)</title'){
        ## (?is): case insensitive, considero `n un carattere comune
        $Titolo=pulisciStringa $matches[1]
      }
      else{
        $Titolo='ND'
      }
    }
    else{
      $Titolo=$Name
    }
    [pscustomobject]@{
      Titolo        =$Titolo
      Href          =$Name
      CreationTime  =$_.CreationTime
      LastWriteTime =$_.LastWriteTime
    }
  }
}

function getBreadcrumbInfo{
  param(
    [string]$wwwPath,
    [string]$rootPath
  )
  $ret=@()
  $pathArray=$wwwPath.split('/')
  $el=''
  for($i=0; $i -lt $pathArray.length-1; $i++){
    $el+=$pathArray[$i]+"/"
    $ret+=[pscustomobject]@{
      Href   ="$el.treeinfo.html"
      Titolo =puliscistringa (Get-Content "$rootPath$($el -replace '/','\').treeinfo")
    }
  }
  return $ret
}

function getDescendantsInfo{
  param(
    [string]$prefix,
    [string]$winPath
  )
  $ret=@()
  Get-ChildItem -Directory $winPath `
  | Where-Object { (Test-Path "$($_.FullName)/.treeinfo") } `
  | ForEach-Object {
    $FullName=$_.fullname
    $DirPath="$Prefix$($_.Name)/"
    $ret+=[PSCustomObject]@{
      Href        = "$DirPath.treeinfo.html"
      Titolo      =pulisciStringa (Get-Content "$Fullname\.treeinfo")
      Descendants =@(getDescendantsInfo $DirPath $FullName)
    }
  }
  return $ret
}

$treeinfoHTML=@"
<!DOCTYPE html>
<html lang="it">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Mappa della cartella attuale</title>
<script src="/_aids/init.js" class="alpa-treeinfo-resources"></script>
</head>
<body>
<nav id="breadcrumb"></nav>
<div id="sezioni"></div>
</body>
</html>
"@
## individuo tutte le cartelle di interesse
$location='C:\Users\aldop\Documents\Sync-Personale\Siti\palareti.eu'
Set-Location $location
$treeinfo=@(Get-ChildItem '.treeinfo' -Recurse)

## per ogni cartella individuo i file da considerare
$treeinfo | ForEach-Object{
  $Titolo=pulisciStringa (Get-Content $_.FullName)
  $DirectoryWin=$_.Directory
  $Directory=$DirectoryWin -Replace '^.*palareti\.eu', '' -replace ('\\', '/')
  $DirectoryRoot=$DirectoryWin -replace '(palareti\.eu).*', '$1'
  $FileHTML=@(getFileInfoWithExtension $DirectoryWin 'htm')+@(getFileInfoWithExtension $DirectoryWin 'html')
  $FilePDF=@(getFileInfoWithExtension $DirectoryWin 'pdf')
  $FilePPT=@(getFileInfoWithExtension $DirectoryWin 'ppt')
  $Breadcrumb=@(getBreadcrumbInfo $Directory $DirectoryRoot)
  $Descendants=@(getDescendantsInfo "" $DirectoryWin)
  if($Descendant -eq $null){ $Descendant=@() }
  $PsCustomObject=[pscustomobject]@{
    Titolo      =$Titolo
    Directory   =$Directory
    FileHTML    =$FileHTML
    FilePDF     =$FilePDF
    FilePPT     =$FilePPT
    Breadcrumb  =$Breadcrumb
    Descendants =$Descendants
  }
  ConvertTo-Json -InputObject $PsCustomObject -Depth 10 | Out-File "$DirectoryWin\.treeinfo.json"
  $treeinfoHTML | Out-File "$DirectoryWin\.treeinfo.html"
}
