# HOW TO CONFIGURE PM TILES ON YOUR DEVICE

`Tag: [HOWTO_ALL_MAPS]`

- Download the bynary for your OS from: https://github.com/protomaps/go-pmtiles/releases

## WINDOWS

- Unzip it, open terminal and check if the pmtiles software is working by launching from the unzipped folder (you can also add the route to your PATH variable): `pmtiles.exe version` (output sample: `pmtiles 1.30.3, commit b50d7b1acd72c02bf428e78f0f5c9dab020b6174, built at 2026-05-28T15:20:42Z`)
- Check which build you are insterested in at https://maps.protomaps.com/builds/, right-click on the corresponding download link and copy link, for instance https://build.protomaps.com/20260617.pmtiles. To retrieve info about the build, you can run: `pmtiles.exe show https://build.protomaps.com/20260617.pmtiles`. See output sample:

```plaintext
pmtiles spec version: 3
tile type: mvt
bounds: (long: -180.000000, lat: -85.051129) (long: 180.000000, lat: 85.051129)
min zoom: 0
max zoom: 15
center: (long: 0.000000, lat: 0.000000)
center zoom: 0
addressed tiles count: 1431655765
tile entries count: 176858172
tile contents count: 134995489
clustered: true
internal compression: gzip
tile compression: gzip
pgf:devanagari:name NotoSansDevanagari-Regular
planetiler:osm:osmosisreplicationseq 120621
planetiler:osm:osmosisreplicationurl https://planet.osm.org/replication/hour/
version 4.14.9
attribution <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap</a>
name Protomaps Basemap
pgf:devanagari:version 1
planetiler:buildtime 2026-03-28T14:41:39.524Z
planetiler:githash 0e5588c4a6e8c29a270a33afe8df62027d889604
planetiler:osm:osmosisreplicationtime 2026-06-17T04:00:00Z
planetiler:version 0.10.2
type baselayer
vector_layers <object, use --metadata to view full JSON metadata>
description Basemap layers derived from OpenStreetMap and Natural Earth
web viewer: https://pmtiles.io/#url=https%3A%2F%2Fbuild.protomaps.com%2F20260617.pmtiles
```

- To extract a specific region (in this case Belgium) and save it locally you can run:

```ps1
# default zoom size 15
pmtiles.exe extract https://build.protomaps.com/20260617.pmtiles belgium.pmtiles --bbox=2.54,49.50,6.41,51.51

# set max zoom to 12
pmtiles.exe extract https://build.protomaps.com/20260617.pmtiles belgium_z12.pmtiles --bbox=2.54,49.50,6.41,51.51 --maxzoom=12

```

The syntax is `pmtiles.exe extract INPUT.pmtiles OUTPUT.pmtiles --bbox=MIN_LON,MIN_LAT,MAX_LON,MAX_LAT` - If you do not specify `maxzoom`, it will get the default value of 15. See more info here: https://docs.protomaps.com/pmtiles/cli#extract. You will see a similar output:

```plaintext
2026/06/17 12:33:11 extract.go:373: fetching 15 dirs, 15 chunks, 7 requests
2026/06/17 12:33:27 extract.go:413: Region tiles 136462, result tile entries 133436
2026/06/17 12:33:27 extract.go:422: fetching 133436 tiles, 522 chunks, 101 requests
fetching chunks  58% |███████████████████████████████████████████████████████████████████████████████████                                                             | (723 MB/1.2 GB, 1.3 MB/s) [18m34s:6m27s]
```

You can then drag and drop your file at https://maps.protomaps.com/#flavorName=light&lang=en&map=0.6/0/0 to view it online

## LINUX (UBUNTU)

- Extract it and navigate to the folder via the terminal
- Execute `sudo mv pmtiles /usr/local/bin/` to be able to use the pmtiles CLI
- Once installed, checks if it works by executing `pmtiles version` or `pmtiles --help`
- Now you can run commands just by typing `pmtiles` before the rest of the parameters, for instance:

```bash
pmtiles show https://build.protomaps.com/20260626.pmtiles
pmtiles extract https://build.protomaps.com/20260626.pmtiles belgium.pmtiles --bbox=2.54,49.50,6.41,51.51
```

Output sample:

```plaintext
2026/06/26 11:57:46 extract.go:373: fetching 15 dirs, 15 chunks, 7 requests
2026/06/26 11:57:51 extract.go:413: Region tiles 136462, result tile entries 133436
2026/06/26 11:57:51 extract.go:422: fetching 133436 tiles, 522 chunks, 101 requests
fetching chunks 100% |██████████████████████| (1.2/1.2 GB, 3.3 MB/s)
2026/06/26 12:04:11 extract.go:578: Completed in 6m26.766334909s with 4 download threads (345.00417412633607 tiles/s).
2026/06/26 12:04:11 extract.go:583: Extract required 111 total requests.
2026/06/26 12:04:11 extract.go:584: Extract transferred 1.3 GB (overfetch 0.05) for an archive size of 1.2 GB
```
