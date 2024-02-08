#Problem

It’s difficult to get web editors to write alt text so we’ve made the alt text field required in our CMS’s. We’d like to give web editors the option to mark an image as decorative but we are concerned that the web editors may use the decorative option on all images to lessen the time involved in creating powerful alt text.

#Proposed Solution

Have the interns work on a proof of concept (POC) webapp that will use Azure AI libraries (or others) and basic frameworks to allow the user to upload an image, write alt text for the image, or mark the image as decorative. If the user clicks the checkbox to mark the image as decorative then we pop up a modal dialog that asks if they are sure they meant to mark the image as decorative, and we’ll also provide some AI produced alt text description suggestions that the web editor can choose from. Or the web editor can click the “Yes, I really want to mark this image as decorative” button.

#User Flow for POC

I’ll just write a quick user flow as I see it. Feel free to make suggestions:
•	The app itself will use basic JS, HTML, and CSS to promote simple adaption to CMS module porting if the proof of concept seems to work.
o	We could also use a framework like Astro to import more complicated functionality that is already written, but I’d say stick to the basics (JS, HTML, and CSS) so it’s easier to port. Astro does support the idea of “islands” that might work well for this task.
•	The UI will consist of:
o	An introductory paragraph with some helper text.
o	An “Upload Image” button.
o	An image viewing area.
o	When an image is uploaded then a text field to enter alt text, and a checkbox to mark the image as decorative will appear.
	One idea is to populate the alt text field with an initial result from the AI, giving the web editor the opportunity to edit the suggested alt text.
o	If the web editor clicks the “Mark as Decorative” checkbox then a modal dialog pops up with the following UI:
	Text that says, “Are you sure you want to mark this image as decorative? Here are a few ideas for alt text, if you aren’t certain:”
	Then we’ll provide three different AI suggestions in a radio button grouping that the web editor can choose from, and it will auto populate their radio button selection into the alt text field.
	Next will be a “Yes, I really want to mark this image as decorative” button.
•	If the user clicks the above button then alt text on the image will be set to null, even if there is information in the alt text field.

#Future Ideas and Support

If we create the POC with a thin client like Astro using basic JS, HTML, and CSS then, if the POC works, we could create custom modules for our CMS’s with greater ease. Astro also supports the use of many other popular frameworks using their “island” format. If there is something that’s too difficult to do in the proposed UI above with JS, HTML, and CSS then the interns could always import components from other frameworks.

I believe Azure has an Astro template for creating a webapp, and I’m almost certain there is an Azure based AI library that does descriptions of images. This will be a good learning experience for the interns (and me), and will help WebTech better utilize the Azure platform.
