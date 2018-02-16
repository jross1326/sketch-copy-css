# Sketch plugin to copy css attributes.

Copy css - same as the default css copy but will convert line-height, font-size and letter-spacing to rem values and colors and font-family to scss variables.

## Install

Download and open sketch-copy-css.zip.

Double click on CssExport.sketchplugin to install.

### Shortcut 

`cmd+shift+c`

### Example
Original:
```
/* H1 - Page Title: */
font-family: ProximaNova-Bold;
font-size: 63px;
color: #000000;
letter-spacing: 0.2px;
line-height: 66px;
background: #FFFFFF;
border: 1px solid #C1A875;
```

With Plugin:
```
font-family:$proximanova;
font-weight:700;
font-size:3.15rem; //63px;
color:$black; //#000000;
letter-spacing:0.01rem; //0.2px;
line-height:3.3rem; //66px;
background:$white; //#FFFFFF;
border:1px solid $gold; //#C1A875;
```
