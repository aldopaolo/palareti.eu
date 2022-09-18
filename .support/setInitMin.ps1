Get-ChildItem 'C:\New\*.txt' -Recurse | ForEach-Object {
     (Get-Content $_) | ForEach-Object { $_ -Replace '/_aids/init.js', '/_aids/init.min.js' } | Set-Content $_
}