module.exports = [
	{ 
		title: 'Hi there...',
		subtitle: "My name is Milo & I'm a web developer with designer's state of mind.",
		slug: 'about',
		description: "I'm focused on creating simple, beautiful and easy to use digital solutions for all types of businesses with a passion for the web, and mobile development. When I’m not making websites, I tend to be working out, brew coffee , learning a new programming language.",
		content: 'About',
		type: 'component',
		colors: {
			background: {r:18, g:26, b:24, a:1},
      font: '#EEEEEE',
      highlight: "#00ffae",
		}
	},
	{ 
		title: 'Hopfinder',
		subtitle: "Craft brewery locator",
		slug: 'hopfinder',
		description: "App to help craft beer enthusiasts find breweries in their neighborhoods or when they travel. In addition, users can favorite breweries and keep up to date on events such as can/bottle releases.",
		content: null,
		type: 'project',
		colors: {
			background: {r:18, g:26, b:24, a:0.8},
      font: '#EEEEEE',
      highlight: '#ffc000'
		},
		technology: ['react.js', 'redux', 'node.js', 'express.js', 'sequelize', 'postgres', 'google api', 'passport.js', 'jwt', 'sass', 'webpack']
		},
	{ 
		title: 'Bisque',
		subtitle: "Pomodoro timer for your chrome",
		slug: 'bisque',
		description: "Inspired by the Pomodoro Technique, this extension for chrome broweser, let's user divide their work hours with small breaks as well as which tracks user's browsing behavior and distraction level.",
		content: null,
		type: 'project',
		colors: {
			background: {r:18, g:26, b:24, a:0.8},
      font: '#EEEEEE',
      highlight: '#00ffd8',
		},
		technology: ['react.js', 'redux', 'firebase', 'chrome extension', 'google api', 'd3', 'sass']
	}
]