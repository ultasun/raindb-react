# RainDB
*RainDB* is a system for [*SKU*](https://en.wikipedia.org/wiki/Stock_keeping_unit) information, mapping physical objects to physical containers. Parent-child relationships can be used to establish an organizational tree.  A USB barcode scanner would make this application a lot more fun to use! 

# Why
The author wrote this as a demonstration of [*CINDI*](https://github.com/ultasun/cindi), which is a Meta-[*DBMS*](https://en.wikipedia.org/wiki/Category:Database_management_systems) to assist with rapid prototyping of web applications.

This [*ReactJS*](https://reactjs.org/) application was part of a capstone project to complete the *Bottega Full Stack Development Certificate*, so any feedback is greatly appreciated...open up an issue in this repository's issue tracker!

# Start-up Instructions
### Automatic 
***Please*** take a look at the *Docker* *Compose* *Pack* [here](https://github.com/ultasun/raindb), it will allow you to start up the multiple images with a single command!

### Manual 
The [CINDI](https://github.com/ultasun/cindi) instance must be running, and then examine [this *INDI* file](https://github.com/ultasun/raindb/blob/master/Attic/app.indi) to see the necessary *INDI* statement to login as the `ADMIN`.

Then, start the development server

`npm install`

`npm run start`

# Credits / Support / Troubleshooting
This was initialized as a [devcamp-js-builder](https://www.npmjs.com/package/devcamp-js-builder) project. Otherwise, it is the sole work of the author. The author is available on [Libera.Chat](https://libera.chat/) under the registered handle ***ultasun***, feel free to message me directly! 

Thank you for reading! 
