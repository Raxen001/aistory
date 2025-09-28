# NOTES


Concise text should return a JSON.
```json
{
    "characters": [...list of characters in the passage],
    "place": "para about the place they are in",
    "setting": "Fantasy or cyberpunk or Current",
    "time": "approximate time the passage takes place",
}
```


-  change how the updateBook and getBook and createBook gives the book data.
create a formatter function that formats the book db properly or use a filterd
output

- Need to implement way to append story points together
- Need to implement proper merging of characters form old data and new data via
pattern matching or some sort matching to combat ai hallucinations. 

- character image generation need to check if an image url is set to that
particular character obj. If not set one.



## TODO

Epub with toc file not in toc.xhtml will not work properly even though the
library should look for toc.html or something else.
