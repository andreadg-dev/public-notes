# Import the json file
$jsonBookmarks = Get-Content .\chrome_bookmarks.json | ConvertFrom-Json

# Get the main folder Id
$devFolderId = ($jsonBookmarks | Where-Object { $_.title -eq "Developing" }).id

# Get subfolders id and titles
$subfolders = $jsonBookmarks | Where-Object { $_.parentId -eq $devFolderId } | ForEach-Object {
    @{$_.title = $_.id }
}

# Get all the corresponding links
$links = $jsonBookmarks | Where-Object { $_.parentId -in $subfolders.Values }

# Create the corresponding useful link objects
$usefulLinksList = $links | ForEach-Object {
    $parentId = $_.parentId
    $categoryName = [string]($subfolders | Where-Object { $_.Values -eq $parentId }).Keys
    $parsedCatName = $($categoryName.ToLower().Replace(" ", "_"))

    [PSCustomObject]@{
        item        = $_.title
        description = "<a href=""$($_.url)"" target=""_blank"">$($_.url)</a>"
        category    = "useful_links_$parsedCatName"
        tags        = @("links", "$parsedCatName")
    }
}

# Convert objects array to JSON and export to file
$usefulLinksList | ConvertTo-Json | Out-File .\links.json