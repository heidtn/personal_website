# Meteor Tracker
Not too long ago I was looking into [meteor hunting](http://www.livescience.com/33876-meteorite-hunting-guide.html).
Hunting for meteors is a pretty arduous process (boring) and I began to consider what kind of things might make it easier.
From there I conceived of the Meteor Tracker.  Using a few camera connected computers I imagine you could not
only detect meteors, but you may be able to determine their speed, origin, and possibly their landing location
(as long as they didn't burn up in the atmosphere).  

<div class="github-card" data-user="heidtn" data-repo="MeteorTracker">
</div>
<br><br><br>  

### Why is this useful?
Firstly finding meteors can tell us a whole lot about our solar system.  It can tell us about its formation and early days.
Also detecting small meteors can often signify the arrival of larger meteoroids.  This is good for anticipating catastrophic
meteor events (make boom with earth).  Finally meteors are worth a lot of money and sentimental value (I want
a meteorite sword).



The basic premise is the take a few computers with cameras and to correlate meteor events as well as triangulate them.
There are a few steps I envision towards achieving this:

1.  We have to know where we are and where we are facing.  The only assumption I'm making at this point is 
	that the camera is normal to the ground (that is to say pointing straight up).  I did some research and
	found [astrometry](http://astrometry.net/).  Astrometry takes an image of the stars and finds out where they are
	in the sky.  Using this data and knowledge of the current time, we can find out where we are and which direction
	we are facing.  

2.  We have to capture meteor events.  The premise here is simple: check for changes in each image frame coming from the
	camera.  If we see something record it.  Now we may capture erroneous data such as airplanes and sattelites, but
	we can figure that out next.  

3.  Correlate these events.  Match up several events from a few different units to determine which captured events
	are the same among them.  We can start by matching up timestamps that are withing a few seconds of each other.
	By knowing where the device is and which direction its facing we can narrow this down to determine which events
	are the same.  

4.  Triangulate the trajectories.  We can use an overconstrained linear algebra matrix to incorporate as many
	cameras as we want.  (pure ray intersection doesn't really work here.  I'll go into detail in future posts)
	If we can capture several frames we can better estimate air resistance and extrapolate the entrance trajectory.


If we get all that, boom, we have a system capable of telling us a ton of information about falling stars.

Optional bonus things:
- a local webserver for changing settings and viewing the most up to date images
- a remote webserver for compiling all tracker data points and making them available to the public
- a cool 3D viewer of impact events and earth intersection trajectories

### Whats the current status?
Currently it can only capture meteor events and there is a rough web server for viewing current images.  The biggest problem
at this point is getting good enough hardware (especially cameras) to capture good meteor events.

UPDATE WITH PART 2 SOON

\-/EOL/