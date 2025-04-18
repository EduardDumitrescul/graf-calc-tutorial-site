## Notice: Unmaintained
This repo is no longer maintained, however there are many alternatives:
- [Markdown-It](https://github.com/markdown-it/markdown-it)
- [Showdown](https://github.com/showdownjs/showdown)
- [Marked](https://github.com/markedjs/marked)
- and more...

# markdown-js

Yet another Markdown parser, this time for JavaScript. There's a few
options that precede this project but they all treat Markdown to HTML
conversion as a single step process. You pass Markdown in and get HTML
out, end of story. We had some pretty particular views on how the
process should actually look, which include:

* Producing well-formed HTML. This means that `em` and `strong` nesting
  is important, as is the ability to output as both HTML and XHTML
* Having an intermediate representation to allow processing of parsed
  data (we in fact have two, both [JsonML]: a markdown tree and an HTML tree)
* Being easily extensible to add new dialects without having to
  rewrite the entire parsing mechanics
* Having a good test suite. The only test suites we could find tested
  massive blocks of input, and passing depended on outputting the HTML
  with exactly the same whitespace as the original implementation

[JsonML]: http://jsonml.org/ "JSON Markup Language"

## Installation

Just the `markdown` library:

    npm install markdown

Optionally, install `md2html` into your path

    npm install -g markdown

### In the browser

If you want to use from the browser go to the [releases] page on GitHub and
download the version you want (minified or not).

[releases]: https://github.com/evilstreak/markdown-js/releases

## Usage