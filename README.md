## Simple load tool
Opens specified number of browser instances (Chromium)

## Installation
Clone this repo and use npm to install all dependencies 

You should have at least Node.js (ver 8 or higher)

<pre>
npm install
</pre>

## Usage

First you need to specify URL to test. It will be stored in local json file and used for future runs

<pre>
gulp url [options]
</pre>

Options:
```
--url, -u         URL to open (use double quotes, e.g. -u "https://myurl.org") [required]
--env, -e         Testing environment (will be used as a key to store URL)     [required]
```

Run tests:

<pre>
gulp test [options]
</pre>

Options:
```
--env, -e         Testing environment (will be used as a key to store URL)    [required]
--instances, -i   Number of browser instances (default: 25)                   [optional]
--timeout, -t     Driver wait timeout in ms. (default: 30*1000)               [optional]
--show, -s        Show browser windows or not (headless mode)  Default: false [optional]
```

## Reporting
After tests are finished you can find report and screenshots in ./output folder.

Report name will be like **YOURENV_yyyy_mm_dd(hh_mm_ss).html**

Click on test to see all content
