# Fun times with bfg and resetting git history

I love git, I find it extraordinarily useful for all kinds of things, even beyond just version control.
Now, my website is hosted on github as I want to share my experience and work with others as a place to work off of.
Github is a great way to do that, but there are DANGERS (gasp! sharp inhale!).  Namely, everything on github is public.
That means not only is all of my most current code available, but all previous iterations as well.

Now here is where I (sort of) screwed up.  I have a mail handler in site server that will send emails to my
personal account if people want to get ahold of me.  Part of this mail handler (nodemailer if you're wondering)
is physically loging to a gmail account.  Now I know what your thinking "oh my god Nate, did you make your personal
email account login publically available?!?" No. I did not.  

Fortunately I had (just) enough foresight to create a email account specifically for handling this email forwarding.
But after consideration I realized I don't want people potentially messing around with it and giving me headaches.
But there's a problem still.  That password is still saved in all those old commits.  Digging through those files
manually could take forever!  What do?

Enter bfg (and git-filter branch by extension).  This retroactively fixes all branches with specific instances...
You know what?  This is a boring topic.  Who cares?  I don't really...
