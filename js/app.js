////////////////////////////////////////////////////////////////////////////////////////////////////
//GRID CSS
	//CSS will only take us so far - we're going to have to learn about a NEW REACT FEATURE!

	//THE CSS GRID SYSTEM - HOW TO TO IMPLEMENT IN JSX:
		<div style="display: grid"></div>
		//to get a better understanding of what's going on we're going to add in some CSS to implement
		//the grid:

	//1 - Create a new file called ImageList.css in components directory:

	//2 - Add import statement in ImageList.js for ImageList.css and add className="image-list" in <div>
		import './ImageList.css';
		<div className="image-list"></div>

	//3 - in ImageList.css: add the following rules to image-list class:
		// display: grid;
		// grid-template-columns: repeat(auto-fill, minmax (250px, 1fr));
			//repeat --> creates a set # of columns
			//auto-fill --> CSS rule will automatically decide how many columns to insert
			//minmax (250px 1fr) --> each column will be at least 250px wide and 
				//1fr --> every column we create, we want them to all be equally sized

	//4 - also add this rule to all img tags in class image-list (.image-list img { rule:whatever; })
		// width: 250px (sets width to 250px)

	//5 - Go inside chrome console, click on elements tab to see the dotted lines for the 'grid slots'
		//Grid-CSS will take each element and shove them into a different spot in that grid
		//Each image is shoved up against the other, doesn't look nice, so let's add a grid-gap rule
			// grid-gap: 10px
				//adds a 10px boundary between the grid boundaries




////////////////////////////////////////////////////////////////////////////////////////////////////
//Issues with Grid CSS
	//Focus: how can we get these images to fit up against each other vertically? (remove vertical whitespace)
		//doing this with grid-css alone is not very easy

	//Imperfect solution:  add rule grid-auto-rows: 200px; to image-list class
		//Now the vertical spacing is better but some of the images are taller than the assigned area

	//To fix this: we can use grid-auto-rows: span 3; however, this will apply to each image and won't look right
		//For every individual image we need to:
			//Determine it's individual height
			//Then use it's height to automatically determine the amount of grid-auto-row: span it needs

			//We'll have to use the console and css to play around with these value
			//Cannot be solved via css alone, so we'll ahve to write some js and this is why we'll need React.




////////////////////////////////////////////////////////////////////////////////////////////////////
//Creating an Image Card Component

	//To solve image spacing issue we have the following objectives:
		//1 - Create a new react component responsible for rendering one single image at a time
		//2 - once image is rendered this comp will figure out how large image is and adjust grid-row-end rule

	//1 - Create ImageCard.js in components directory, make functional comp that returns an image wrapped in a div
		const ImageCard = () => {
			return(
				 <div>
				 	<img />
				 </div>
			);
		};
	//2 - add alt and url props to img tag:
		<img src={image.urls.regular} alt={image.alt_description}/>

	//3 - ImageList.js -> import ImageCard, and replace <img> tag with <ImageCard/> component w/ only the key prop:
		<ImgCard key={id}/>

	//4 - Also we are no longer destructuring the args so we change the map back to this:
		const images = props.images.map((image) => {
			return <ImageCard key={image.id} image={image}/>
			//5.b - additionally the image to ImageCard as the image prop  
		});
