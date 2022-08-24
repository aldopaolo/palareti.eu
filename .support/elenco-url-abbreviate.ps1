
$PathCSV  = "$env:USERPROFILE\Documents\Sync-Personale\Siti\palareti.eu\.support\"
$PathJSON = "$env:USERPROFILE\Documents\Sync-Personale\Siti\palareti.eu\storia-suddivisioni-territoriali\"

$FileAbbrName="elenco-url-abbreviate"
$FileUrlIn="elenco-url-completo"
$FileUrlOut="elenco-url"

$ObjAbbr=(Import-Csv -Delimiter ";" -Path "$PathCSV$FileAbbrName.csv" -Encoding utf8 | Sort-Object tinyurl)
<# `
| Sort-Object tinyurl `
| ConvertTo-Json `
| Set-Content -Path "$PathJSON$File.json" -Encoding utf8
#>

Import-Csv -Delimiter ";" -Path "$PathCSV$FileUrlIn.csv" -Encoding utf8 `
| ForEach-Object {
  $url=$_.Url
  if($url -like "*.*"){
    ## considero solo i record validi
    $pag=$_.Pag
    $schema=$_.Schema.TrimEnd(':/')
    if ($url -like 'tinyurl.com/*') {
      ## per le tinyurl considero la url di riferimento
      $tinyurl=$url
      $_tinyurlId=$tinyurl.split("/", 2)[1]
      $url= ($ObjAbbr | Where-Object { $_.tinyurl -eq $_tinyurlId }).url
      $_uri=[uri]$url
      $schema=$_uri.Scheme
      $domain=$_uri.Host
      $type='tinyurl'
    }else{
      $domain="$(($_.Www -eq '')?'':'www.')$($_.Dominio)"
      $tinyurl=''
      $type=($schema -eq '')?'site':'url'
    }
    [pscustomobject]@{
      type    =$type
      url     =$url
      pag     =$pag
      schema  =$schema
      domain  =$domain
      tinyurl =$tinyurl
    }
  }
} `
| Sort-Object @{e ={ $_.pag -as [int] } } `
| ConvertTo-Json `
| Set-Content -Path "$PathJSON$FileUrlOut.json" -Encoding utf8
<#
| ? { $_.Url -like "*.*" } `
| % {if($_.Www -eq "www"){$_.Www="www."}; $_} `
| Sort-Object @{e={$_.Pag -as [int]}} `
| ConvertTo-Json `
  | Set-Content -Path "$PathJSON$File.json" -Encoding utf8
#>
