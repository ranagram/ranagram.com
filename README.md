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
  $ git pull origin master
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
  $ git push origin master
  ```

## How to update "PROGRESS"

1. At first check remote update
  ```
  $ git pull origin master
  ```
2. Post or Edit RANAGRAM entry in [Tumblr](https://www.tumblr.com/)
3. Run `$ gulp deploy`
4. Check your changes with [http://localhost:3000](http://localhost:3000) URL on your browser.  
If you found some errors, return to "2"
5. Commit updated files as follows
  ```
  $ git add .
  $ git commit -m "COMMIT MESSAGE (should be kind to others)"
  ```
6. Push your changes
  ```
  $ git push origin master
  ```
