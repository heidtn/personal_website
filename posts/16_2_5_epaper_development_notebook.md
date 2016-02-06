# epaper dev notebook
<br>
I'm constantly trapped in doors when I'm working and it can wear on me after awhile.  Having a low power dev computer that works in full sunlight seemed like an awesome idea.  Not only that, but because e-ink has a poor refresh rate I wouldn't be able to watch videos and the like therein keeping me focused!  Win-win.  Awesome.

So like a good lazy engineer I found someone who already did something similar.  I present the <a href="http://www.raspberrypi.org/kindleberry-pi-the-second/">Kindleberry Pi</a>.  Following the instructions <a href="https://gist.github.com/rvagg/5095506">here</a> I managed to get shell access on my kindle as well as install an SSH client.  I have a kindle paperwhite so I had to make some small changes to get everything to work.  Following are the changes I made and reasons behind them:

1. change the /etc/inittab entry to

	<pre><code class="language-bash">
	1:2345:respawn:/sbin/getty --autologin pi --noclear 38400 tty1
	</code></pre>

	Instead of
	<pre><code class="language-bash">
	1:2345:respawn:/bin/login -f  tty1 /dev/tty1
	</code></pre>

	For some reason this broke the login on my pi and it got stuck in a strange boot loop. If this happens to you I believe you can get around it with alt+f2

2. Add the following to .bashrc
	<pre><code class="language-bash">
	KINDLECONNECTED=`grep "usb0" /proc/net/dev`
	if  [ -n "$KINDLECONNECTED" ] ; then
	     sudo ifconfig usb0 192.168.15.201
	fi
	</code></pre>

	The usb interface doesn't assign my Pi an IP so this gives it a static one where the kindle can find it.  .bashrc is  called first thing on any shell startup and I always want this to run if the kindle is connected.  screen -xR is also called, but is instead run through .bash_profile which is only called on a shell that is logged using a username and password (like ssh or first boot).

	On top of this I wanted to connect to the rPi over USB.  I didn't want to use a hub and I also wanted the rPi to be able to connect to the internet over WiFi.  I can still connect over WiFi, but I'd have to configure static IP's differently.  This is what I want for now.

3.  Finally on the kindleberrypi.sh script I stripped it down because I decided not to use keys and to just use the basic password authentication.  Fair warning that this is generally not a good idea, but for some reason my keys weren't working so I dropped it. Anyways my script looks like this:

	<pre><code class="language-bash">
	KINDLECONNECTED=`grep "usb0" /proc/net/dev`
	#!/bin/sh
	 
	# where kterm is installed
	KTERM=/mnt/us/extensions/kterm/
	# colour scheme, 0=black on white, 1=white on black
	COLOUR=1
	# font size
	FONT=7
	# username on your Pi
	USER=pi
	# hostname of your Pi
	HOST=192.168.15.201
	 
	# run the Extend commands to mount /opt/ so we can get to /opt/bin/ssh
	/mnt/us/extend/unmount.sh
	/mnt/us/extend/mount.sh
	 
	# set orientation to landscape
	lipc-set-prop com.lab126.winmgr orientationLock R
	 
	# 
	${KTERM}/bin/kterm -c ${COLOUR} -s ${FONT} -e "/opt/bin/ssh ${USER}@${HOST}"
	 
	# run after exit to make sure the keyboard is gone
	killall matchbox-keyboard
	</code></pre>

The only thing I changed where the USER HOST and ${KTERM} lines. I have to enter the password using the kindle keyboard, but it all works as expected.

I've played around with it a fair bit and so far I like it a lot.  The delay takes some getting used to.  It's better to look at the keyboard instead of the screen while typing, but I definitely stay more focused and the rPi-kindle combo can run on a 7000 mAh portable charger for 10+ hours.  I think the next step is to try vnc for working with graphical stuff as well as making a 3D printed case to hold/organize all the pieces.

\-/EOL/