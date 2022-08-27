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
    if($extension -like 'htm*'){
      $_content=Get-Content $_.fullname -Raw
      if($_content -match '<h1>(.*)</h1>'){
        $Titolo=pulisciStringa $matches[1]
      }
      elseif($_content -match '<title>(.*)</title>'){
        $Titolo=pulisciStringa $matches[1]
      }
    }
    else{
      $Titolo=$_.Name
    }
    [pscustomobject]@{
      Titolo   =$Titolo
      # Estensione =$extension
      PathName =$_.Name
      # FileDir    =$_.DirectoryName -Replace '^.*palareti\.eu\\', '/' -replace ('\\', '/')
    }
  }
}

function getDescendantInfo{
  param($path)
  $ret=@()
  Get-ChildItem -Directory $path `
  | Where-Object { (Test-Path "$($_.FullName)/.treeinfo") } `
  | ForEach-Object {
    $FullName=$_.fullname
    $ret+=[PSCustomObject]@{
      Name       = $_.Name
      Titolo=pulisciStringa (Get-Content "$Fullname\.treeinfo")
      Descendant =getDescendantInfo $FullName
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
<title>Mappa della directory</title>
<script src="/aid/init.js" class="alpa-bootstrap-resources alpa-treeinfo-resources"></script>
</head>
<body>
<div id="treeinfo-html"></div>
<div id="treeinfo-pdf"></div>
<div id="treeinfo-ppt"></div>
<div id="treeinfo-dir"></div>
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
  $Directory=$DirectoryWin -Replace '^.*palareti\.eu\\', '/' -replace ('\\', '/')
  $FileHTML=@(getFileInfoWithExtension $DirectoryWin 'htm')+@(getFileInfoWithExtension $DirectoryWin 'html')
  $FilePDF=@(getFileInfoWithExtension $DirectoryWin 'pdf')
  $FilePPT=@(getFileInfoWithExtension $DirectoryWin 'ppt')
  $Descendant=getDescendantInfo($DirectoryWin)
  $PsCustomObject=[pscustomobject]@{
    Titolo     =$Titolo
    Directory  =$Directory -Replace '^.*palareti\.eu\\', '/' -replace ('\\', '/')
    FileHTML   =$FileHTML
    FilePDF    =$FilePDF
    FilePPT    =$FilePPT
    Descendant =$Descendant
  }
  ConvertTo-Json -InputObject $PsCustomObject -Depth 10 | Out-File "$DirectoryWin\.treeinfo.json"
  $treeinfoHTML | Out-File "$DirectoryWin\.treeinfo.html"
}
