yunode
======

Nodejs server running on arduino yun and talking to the atmega chip. This is a first attempt. A simple http server is hosted on thi arduino Yun. I listens to the serial port for any data comming from arduino and posts it to an html page. The page updates every 3 seconds...

####Dependencies
Before starting there are some things we need to do:

__Exanding the Yun's disk space using a microSD card and an arduino sketch:__

There is a very clear tutorial on how to do this at: [tutorial](http://arduino.cc/en/Tutorial/ExpandingYunDiskSpace). After uploading the "yunDiskSpaceExpander.ino" to the Yun and opening the serial terminal from the arduino IDE (as mentioned in the tutorial) you might get the message:

	Unable to connect: retrying (1)... 
	Unable to connect: retrying (2)... 
	Unable to connect: retrying (3)... 
	Unable to connect: retrying (4)... 
	Unable to connect: is the sketch using the bridge? 

To fix this you should plug your arduino Yun directly to your computer (via usb) and sellect the apropiate port from the arduino tools menu (Do not use the wifi option yourYunName at ip etc etc... Please use the usb serial) After seting up the port correctly, then upload the sketch, reopen the serial terminal and follow the instructions.

__Installing nodejs on the Yun:__

After successfully exanding your Yun's disk space you are now ready to install nodejs. 

1.ssh into your yun through the terminal:

	ssh root@yourYunName.local

It will prompt for your Yun's password.

2.After connected to the board via ssh update the yun:

	opkg update

3.Install nodejs:

	opkg install node

You should now have node up and running. Test it by typing:

	node

####Create a NODEJS server on the Yun

By default, after expanding the Yun's disk space, a new folder is created and shared public as static content The path is:

	/mnt/sda1/arduino/www

We will create a new folder for our server at the same level of the "www" folder (NOT inside the "www" folder)

1.ssh into the yun:

	ssh root@yourYunName.local

2.Go to the root folder:

	cd ..

3.Go to the arduino folder and create a new folder for your nodejs serve:

	cd mnt/sda1/arduino

	mkdir yunode

For some reason nano (the linux terminal text editor) does not work for me inside this new folder. So I decided to write the scripts on my local machine and then transfer them to the Yun.

	The nodejs script is called server.js and is part of the repository...

Save the script with any name you want, I called mine "server.js". Now, to transfer the new nodejs script to the Yun we will use the terminal command "scp". This process was done using ubuntu 13.10 but it should work perfectly fine with any version of Mac OSX. From a new terminal window type:

	scp server.js root@yourYunName.local:/mnt/sda1/arduino/yunode/

NOTE: Make sure that, in your terminal, you are at the same level as your server.js file.

Now if you check your your "yunode" folder in your Yun, you should see the transfered file.

####Install node-serialport

In order to use the serial port from nodejs we will need to install a special package for the yun. So SSH into the Yun if your are not in it already. Then type and hit enter for the following commands, one after the other:

	opkg update

	opkg install node-serialport


####Disable the Bridge Script on the Yun
Disable the Yun's bridge to take control of the serialport interface. Yo can ENABLE it later if you want by undoing the process.

1.SSH into the Yun (if you are not already in):

	ssh root@yourYunName.local

2.Now we need to edit the "/etc/inittab" file and comment the ttyATH0 line by putting a # before it:

	nano /etc/inittab

After editing your inittab file should look like:

	::sysinit:/etc/init.d/rcS S boot
	::shutdown:/etc/init.d/rcS K shutdown
	#ttyATH0::askfirst:/bin/ash --login

####Uploading the firmata sketch to the Yun
Just upload the yunode.ino (included in the repository) to your arduino Yun. You can do this using the arduino IDE.

####Running
From your arduino Yun's terminal, cd into the directory of the project:

	cd /mnt/sda1/arduino/yunode

Then run the nodejs script:

	node server.js

ENJOY!!

