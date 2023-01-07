# apngasm-bin

> This is a bin wrapper for [APNG Assembler](https://sourceforge.net/projects/apngasm/) `v2.91`.<br>
> APNG Assembler creates APNG animation from PNG/TGA image sequence.

## Install

```
$ npm install --save apngasm-bin
```

## Usage

```js
import {execFile} from 'node:child_process';
import apngasm from 'apngasm-bin';

execFile(apngasm, ['output.png', 'frame*.png', 1, 10, '-l0'], err => {
	if (err) {
		throw err;
	}

	console.log('Image created!');
});
```

## CLI

```
$ npm install --global apngasm-bin
```

```
$ apngasm
```

> **_Note_**:
>
> The **apngasm** binary does not have a neutral `--help` or `--version` command option, so to display this information, run it without any arguments. Note that this will return with exit code `1`, flagging an error even though nothing went wrong.

## Arguments & Options
From source's [**readme.txt**](vendor/source/readme.txt):
```
Usage:

apngasm output.png frame001.png [options]
apngasm output.png frame*.png   [options]

Options :
1 10    : frame delay is 1/10 sec. (default)
-l2     : 2 loops (default is 0, forever)
-f      : skip the first frame
-hs##   : input is horizontal strip of ## frames (example: -hs12)
-vs##   : input is vertical strip of ## frames   (example: -vs12)
-kp     : keep palette
-kc     : keep color type
-z0     : zlib compression
-z1     : 7zip compression (default)
-z2     : Zopfli compression
-i##    : number of iterations (default -i15)

----------------------------------------------------------------
Example 1:

Let's say you have following frame sequence:
frame01.png
frame02.png
frame03.png

And you want to have 3/4 seconds delay between frames.
The correct command will be

apngasm output.png frame01.png 3 4


If frame02.txt is found with the following one-line content,
it will override delay information for frame 2:

delay=25/100

----------------------------------------------------------------
Example 2:

The same as above, but you added "invisible" frame00.png :
frame00.png - invisible
frame01.png
frame02.png
frame03.png

The correct command will be

apngasm output.png frame00.png 3 4 /f

That way APNG supported browsers and image viewers
will show frame01-frame02-frame03 animation,
while IE will display static frame00.png image.

----------------------------------------------------------------
Example 3:

apngasm output.png frame01.png

That way you'll get 1/10 sec delay.

----------------------------------------------------------------
Example 4:

Using this 2900x100 "filmstrip" image as input:
https://abs.twimg.com/a/1470716385/img/animations/web_heart_animation.png

apngasm output.png web_heart_animation.png -hs29

Switch -hs29 specifies that input is horizontal strip of 29 frames

----------------------------------------------------------------
Some optimizations used in APNG Assembler might re-sort the
palette, or change the color type from RGBA and RGB modes
to RGB and indexed modes. Those optimizations are only performed
when they are lossless, but if you want to avoid changing the
palette or colortype, use those switches to turn them off:

/kp     : keep palette
/kc     : keep color type
```

## Related
* [**apngdis-bin**](https://github.com/vHeemstra/apngdis-bin/) - Bin wrapper for APNG Disassembler

## Credits

* [APNG Assembler](https://sourceforge.net/p/apngasm/) by [Max Stepin](https://github.com/maxstepin)
* This package is made by [Philip van Heemstra](https://github.com/vHeemstra)
* Based on [jpegtran-bin](https://github.com/imagemin/jpegtran-bin) by [Sindre Sorhus](https://github.com/sindresorhus)
