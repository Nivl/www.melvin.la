I am rewriting this project from scratch using Angular 2. Check the [branch "next"](https://github.com/Nivl/www.melvin.la/tree/next) to check it out. 

Dependencies
============

You can install most of the dependencies using PIP:

        pip install -r requirements.txt


You'll also need the following apps:

 * [wkhtmltopdf](http://code.google.com/p/wkhtmltopdf/) (only tested with the 0.11.0 rc1 static version)
 * django-pipeline requires [lessc](https://github.com/cloudhead/less.js) and a js/css minifier ([cssmin](https://github.com/zacharyvoase/cssmin) and [UglifyJS](https://github.com/mishoo/UglifyJS) are recomended. [see list](http://django-pipeline.readthedocs.org/en/latest/compressors.html)).
