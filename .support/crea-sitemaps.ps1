
Set-Location 'C:\Users\aldop\Documents\Sync-Personale\Siti\palareti.eu'

$html0=Get-ChildItem -Recurse -Path "*.htm*"
$html0+=Get-ChildItem -Recurse -Path "*.pdf"
$html0+=Get-ChildItem -Recurse -Path "*.ppt"

$html=($html0 |
  ForEach-Object{
    $Name=$_.Name
    $SitePath=$_.DirectoryName -Replace '^.*palareti\.eu', '' -replace ('\\', '/') -replace '^/', ''
    if(($Name -match '\.(html?|pdf|ppt)$') <# -and ($SitePath -notcontains '/\.')#>){
      [pscustomobject]@{
        Name     =$Name
        SitePath =$SitePath
      }
    }
  }
)
## $html | Format-Table Name, SitePath
$html | Sort-Object SitePath | Group-Object SitePath | ForEach-Object{
  $Directory=$_.Name
  if($Directory -notmatch '^(aid|classeliceo|css|js|img|lib)(/|$)'){
    ## lavori/tra-guerra-e-resistenza|lavori/2006-Aica
    $lista=@($_.Group | Select-Object Name -ExpandProperty Name)
    [pscustomobject]@{
      Directory =$Directory
      Lista     =$Lista
      Num       =$Lista.Count
    }
  }
} | Format-Table Directory, Num, Lista
##     ($SitePath -notmatch '^(aid|classeliceo|css|js|img|lib|tra-guerra-e-resistenza)(\\|$)')
