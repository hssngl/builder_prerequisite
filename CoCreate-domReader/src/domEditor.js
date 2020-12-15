
	console.log('domEditor is loading from', window.location.pathname)






	CoCreateSocket.listen('domEditor', function(data) {
		console.log('raw object recieved: ', data.target, data.value[1], window.location.pathname)
		// resolving the element_id to real element in the clinet
		if (data.target) {
			data.target = document.querySelector(`[data-element_id="${data.target}"]`);
		}
		if (data.value[1]) {
			data.value[1] = document.querySelector(`[data-element_id="${data.value[1]}"]`);
		}
		if(!data.target)
			return console.log('dnd error: draggble is null')
		if(!data.value[1])
			return console.log('dnd error: droppable is null')
		// passing it to domEditor
		domEditor(data);
	})


	/* domEditor Object Example

			domEditor({
							target: 'object',
							selector_type: 'querySelectorAll',
							selector: '*',
							method: 'setAttribute',
							index : null,
							property : null,
							value : '{'first_attr':'cvalue','second_attr':'value'}',
			});
		*/


	/**
		* domEditor used to run a dom command in remote and now used to do all sort of things
		* 
		* @param paramObject param objects
		* @param {element} [paramObject.context=document] the context in which the selector_type and selector is called to resolve to a/list of target
		* @param {element|element[]} [paramObject.target] alternatively you can feed the target by setting target. if you set target, selector_type, selector and context is skiped.
		* @param {integer} [paramObject.index=null] if the index specified and target be an array, it will select that target in that array
		* @param {string} [paramObject.selector_type] selector_type will be called on context, example: querySelectorAll, querySelector, getElementById,
		* @param {string} [paramObject.selector] is the parameter of the selector_type and applied to it, example: #id_example, .class
		* @param {string} [paramObject.method=null] the method that will be called on targets
		* @param {string} [paramObject.property] css property can alternatively define here. example: null,length,color
		* @param {string|array|object} [paramObject.value] if method param is defined, value is applied as a parameter, example: “hola, hey” ; “hola”, “hey”;  “string”; {‘first_attr':'cvalue','second_attr':'value'},  ['positon', 'value']
					if you give an array it is going to invoke method for every element in the array

				@returns if method is not defined the target is returned otherwise the result of all method invokation is returned
		*
		*/



/**
	* assign to a property, if method is not a function the value will be assigned
	domEditor({
			target: 'object',
			method: 'setAttribute',
			value : 'value',
	});
	*/

	function domEditor({ context, target, selector_type, selector, method, index, property, sub_property, value, idGenerator }) {


		if (!context)
			context = document;



		if (!target || !target.tagName) {
			if (!context[selector_type])
			{
				console.error('selector typt not supported' , selector_type)
				throw new Error('selector type not supported.' + selector_type)
			}

			target = context[selector_type](selector);
			if (!target)
				return null;
		}

		if (index && target[index])
			target = target[index];

		let targets = (target.length > 0) ? target : [target];

		for (target of targets) {
			if (target instanceof NodeList)
				continue;
			if (target && idGenerator) {
				if (!target.getAttribute('data-element_id'))
					target.setAttribute('data-element_id', idGenerator())
			}
		}


		if (!method)
			return target;

		let results = [];
		let element;
		targets.forEach(target => {
			let result = apply_method({ target, method, property, value, idGenerator })
			if (result)
				results.push(result);
			else
				element = target[method]

		})
		if (element) return element;
		return results;
	}


	function apply_method({ target, method, property, value, mutliValue, idGenerator }) {
		let results = [];

		if (target instanceof NodeList)
			return;

		if (typeof value == 'string')
			value = [value];

		if (method == 'style')
			if (value !== null) {
				target[method][property] = value;
				return;
			}
		else {
			return target[method][property];
		}

		let querySection = method.split(".");
		let func = querySection.reduce((a, c) => a[c], target);
		let lastEl = querySection.pop();
		let env = querySection.reduce((a, c) => a[c], target);

		if (typeof env[lastEl] != 'function')
		{
			if (value) {
				env[lastEl] = value;
				return;
			}
			else {
				return env[lastEl];
			}
		}


		try {
			if (!value && typeof env[lastEl] == 'function')
				env[lastEl]();

		}
		catch (error) {
			console.warn(`failed to call ${lastEl}, `, error)
		}


		if (Array.isArray(value)) {
			let result = func.apply(env, value)
			results.push(result)
		}
		else if (typeof value == 'object') {
			Object.entries(value).forEach((e) => {
				let result = func.apply(env, e)
				results.push(result)
			});
		}


		return results;
	}




	function domElements() {

	}





	// dom.element([{
	//     displayname: 'defualt'
	//     selector: ['body, body *'],
	//     draggable: 'false',
	//     droppable: 'true',
	//     hoverable: 'true',
	//     selectable: 'true',
	//     classes: '[]',
	//     attributtes: '[]',
	//     editable: 'true',
	//     // toolbar: { 'test': 'testing this' },
	//   },
	//   {
	//     displayname: 'select'
	//     selector: 'select',
	//     editable: 'false'
	//   }
	// ], { context: newElement });
	// );

	// dom.element([{
	//     selector: ['body, body *'],
	//     classes: '[]',
	//     attributtes: '[]',
	//   },

	domElements.prototype.element = function(listOftodo, sharedConfig = {}) {


		if (!Array.isArray(listOftodo))
			listOftodo = [listOftodo];

		for (todo of listOftodo) {

			let {
				displayName,
				classes,
				attributtes,
				draggable,
				droppable,
				selectable,
				editable,
				hoverable,
				cloneable,
				...rest
			} = todo;

			

			var dataset = {
				...(displayName ? {"data-name": displayName } : {})
			};
	let vardroppable = "data-droppable";
	let vardraggable = "data-draggable";
	let varcloneable = "data-cloneable";
	let varselectable = "data-selectable";
	let vareditable = "data-editable";
	let varhoverable = "data-hoverable";
	let varname = "data-name";
	let vargroup_name = "data-group_name";
	let vardata_insert_html = "data-insert-html";

			if (draggable) dataset[vardraggable] = draggable;
			if (droppable) dataset[vardroppable] = droppable;
			if (selectable) dataset[varselectable] = selectable;
			if (editable) dataset[vareditable] = editable;
			if (hoverable) dataset[varhoverable] = hoverable;
			if (cloneable) dataset[varcloneable] = cloneable;


			domEditor({ context: sharedConfig.context, ...rest, selector_type: 'querySelectorAll', method: sharedConfig.setAttribute || 'setAttribute' , value: dataset, idGenerator: UUID });
			domEditor({ context: sharedConfig.context, ...rest, selector_type: 'querySelectorAll', method: 'classList.add', value: classes, idGenerator: UUID });
			domEditor({ context: sharedConfig.context, ...rest, selector_type: 'querySelectorAll', method: sharedConfig.setAttribute || 'setAttribute', value: attributtes, idGenerator: UUID });
			
		}
		console.log('domEditor element end')


	}

	window.dom = new domElements();
	console.log('domEditor is loaded from', window.location.pathname)
	