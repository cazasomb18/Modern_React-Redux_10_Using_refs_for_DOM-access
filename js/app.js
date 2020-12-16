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

	//5 - Descruture props we want out of this.props.image out from ImageCard.js:
		const { alt_description, urls } = this.props.image;
		//so that we can do this:
			<img alt={alt_description} src={urls.regular}/>



////////////////////////////////////////////////////////////////////////////////////////////////////
//Accessing the DOM with Refs

	//Chronology of <ImageCard/> events:
		//Let ImageCard render itself and image
		//Reach into the DOM and figure out height of the image
		//Set the image height on state to get the component to rerender
		//When rerendering, assign a 'grid-row-end' to make sure the image takes up the apropriate space

		//1 - Let ImageCard render itself...

		//2 - REach into the DOM and figure out height of the image:
			//We may be able to do this w/ vanilla js like this: document.querySelector('img').clientHeight;
			//IN REACT WE DO NOT MAKE USE OF THE document.querySelector() system, instead we use REACT REFS


		//REACT REFS
			//Gives access to a single DOM element
			//We create refs in the constructor
				//assign them to instance vars
					//then pass them (refs as instance vars) 
						//-->to a particular JSX element as props




////////////////////////////////////////////////////////////////////////////////////////////////////
//Accessing Image Height

	//Creating a React Ref inside our ImageCard.js component:

		//1 - In constructor(props) w/ super(props): 
			this.imageRef = React.createRef();

		//2 - add ref property to <img/> tag in return statement:
			<img ref={this.imageRef} /> 
				/*anywhere here we can reference this.imageRef to get some info about this DOM node*/
					//*@ this point this is not a DOM element, this is a JSX tag, that will BECOME a DOM e
					//*we don't ahve a good way to get a handle on the DOM e that is being produced by <img/>
					//other than the REACT REF SYSTEM

			//Ref system: is how we get a handle on some sort of particular element that is generated by a jsx <>

			//In order see what we're dealing w/ let's console.log(this.imageRef) in cdm:
			componentDidMount(){
				console.log(this.reactRef);
				console.log(this.reactRef.current.clientHeight);
			};
				//But we get clientHeight of 0... what is going on here???
					//--> we're console.loging these values before we even have a chance to load the image!
						//If we try to access the clientHeight from the CDM React can't even get that info
						//at that stage b/c at CDM(){} lifecycle the image hasn't loaded  yet!



////////////////////////////////////////////////////////////////////////////////////////////////////
//Callbacks on Image Load - adding event listener to get clientHeight

	//1 in CDM - reference the image ref w/ an event listener (very vanilla js eventListener)
	componentDidMount(){
		this.imageRef.current.addEventListener('load', this.setSpans);
	}

	//2 Formulate the Callback into an ArrowFunction in order to avoid any call back issues:
	setSpans = () => {
		console.log(this.imageRef.current.clientHeight)
	};


////////////////////////////////////////////////////////////////////////////////////////////////////
//Dynamic Spans
	//Let's inspect a div element in the browser's console to play around with the grid-row-end: span_; rule
		//inspect>select div e > add rule: grid-row-end: span 2-3;

	//According to this observation let's add a rule to ImageCard.css .image-card img {}:
		//css: grid-row-end: span 2

	//All we're doing now is taking the height of each row and deciding how many rows it will take to display
	//each of these images:

		//in ImageCard.js, setSpans = () => {}:
		const height = this.imageRef.current.clientHeight;
			//grabbing current.clientHeight and storing in height var

		//also in setSpans = () => {};:
		const spans = math.ceil(height / 150); 
			//height divided by row height (which is 150px)
				//math.ceil caps the value of the spans var

		//still in setSpans = () => {} - call setState({}) & initialize state in the constructor:
			this.setState({spans: spans});
				//in setSpans = () => {};
				state = { span: 0 };
				//in constructor(){}

	//Now we take the spans value and assign it as a style in the <div> in the return statement on ImageCard.js:
		<div style={{ gridRowEnd: `span ${this.state.spans}` }}></div>

	//Now - In some cases we're getting just a little bit too much whitespace:
		//We don't want to overallocate too many rows to any individual image
		//In ImageList.css change grid-auto-rows: from 150px - 10px:
		//Change spans calculation to reflect the new row height: 
			const spans = Math.ceil(height / 10);
		//Finally we change the grid-gap: rule:
			// grid-gap: 0 10;
				//==> 1st value 0 horizontal space, second value 10px horizaontal space
////////////////////////////////////////////////////////////////////////////////////////////////////
//App Review:
	//HUGE ISSUES WE RAN INTO:
		//The value of 'this' when invoking callback functions
			//ANYTIME YOU HAVE A CALLBACK FUNCTION, JUST TO BE SAFE USE THE ARROW FUNCTION SYNTAX

	//Another huge issue - CAN ONLY PASS PROPS DOWN FROM A PARENT TO A CHILD
		//this was an issue b/c we wanted to communicate the search term from SearchBar to App
			//We pass a callback from the PARENT TO THE CHILD 
			<SearchBar onSubmit={ this.onSearchSubmit } />
				//(App.js)

				//then child will call that callback
				e.preventDefault();
				this.props.onSubmit(this.state.term);
					//(SearchBar.js, in onFormSubmit = event => {  })
	//WE learned how to RENDERLISTS:
		//ANYTIME WE WANT TO RENDER A LIST WE'RE GOING TO WANT TO USE: this.object.map((e => e.data.whatever))
		//We also have to define a key prop on list that is consistent and unchanging per record between rendering
			//Will almost always use the id property from your data as that key value

	//Introduction to grid system: