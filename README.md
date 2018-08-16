# helix-blog

To run:

```
git clone https://github.com/kptdobe/helix-blog.git
cd helix-blog/ng_blog
# build Angular site and deploy it into the src/static folder
ng build --base-href=/dist/ --output-path=../src/static/
cd ..
hlx up
```

Open [http://localhost:3000/dist/index.html](http://localhost:3000/dist/index.html)
