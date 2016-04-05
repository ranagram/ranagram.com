# www.ranagram.com website

## Setup

Install [Node.js](https://nodejs.org/en/)  
We recommend Node.js v.4.x latest.

Open terminal and run following commands.

```
$ git clone https://github.com/ranagram/ranagram.com.git SOME-LOCAL-DIRECTORY
$ cd SOME-LOCAL-DIRECTORY
$ npm install
```

## How to update "PROJECTS"

1. At first check remote update

    ```
    $ git pull origin gh-pages
    ```

2. Run `$ gulp`
3. Update `/data.json` with your editor
4. Check your changes with [http://localhost:3000](http://localhost:3000) URL on your browser.  
If you found some errors, return to "3"
5. Commit updated files as follows

    ```
    $ git add .
    $ git commit -m "COMMIT MESSAGE (should be kind to others)"
    ```

6. Push your changes

    ```
    $ git push origin gh-pages
    ```
    
### data.json 

   
	{
       "uid": "keyword for the url",
       "date": "2015",
       "title": ["title line 1", "title line 2"],
       "toptitle": ["top title line 1", "top title line 1"],
       "topsize": "large", // トップ画像サイズ
       "top_visual": "0.jpg",
       "video_id": "156825731",
       "main_visuals": [
           {"type": "picture", "path": "1.jpg"},
           {"type": "picture", "path": "2.jpg"},
           {"type": "picture", "path": "3.jpg"},
           {"type": "picture", "path": "4.jpg"}
       ],
       "description_en": "Description in English",
       "description_ja": "日本語説明文",
       "workshop": [
           "Venue: Ikejiri Institute of Design",
           "Date: Feb 14, 2016."
       ],
       "credits": [
           "Designer, Facilitator: Nozomi Shirai",
           "Software Developer, Sound Designer: Masahide Yoshida"
       ]
	}
        

## How to update "PROGRESS"

1. At first check remote update

    ```
    $ git pull origin gh-pages
    ```

2. Post or Edit RANAGRAM entry in [Tumblr](https://www.tumblr.com/)
3. Run `$ gulp deploy`
4. Run `$ gulp` and check your changes with [http://localhost:3000](http://localhost:3000) URL on your browser.  
If you found some errors, return to "2"
5. Commit updated files as follows

    ```
    $ git add .
    $ git commit -m "COMMIT MESSAGE (should be kind to others)"
    ```

6. Push your changes

    ```
    $ git push origin gh-pages
    ```
