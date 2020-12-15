let elementConfig = [{
    displayname: 'default',
    selector: ['body, body *'],
    draggable: 'true',
    droppable: 'true',
    hoverable: 'true',
    selectable: 'true',
    editable: 'true',
    // toolbar: { 'test': 'testing this' },
  },
  // {
  //   displayname: 'body',
  //   selector: ['body, body'],
  //   draggable: 'false',
  // },
  // {
  //   displayname: 'form',
  //   selector: ['form'],
  //   editable: 'true'
  // },
  // {
  //   displayname: 'input',
  //   selector: 'input',
  //   editable: 'false'
  // },
  // {
  //   displayname: 'textarea',
  //   selector: 'textarea',
  //   editable: 'false'
  // },
  // {
  //   displayname: 'select',
  //   selector: 'select',
  //   editable: 'false'
  // },
  // // sortable 
  // {
  //   selector: '[data-group_name]',
  //   droppable: 'true',
  // },
  // {
  //   selector: ['.sortable'],
  //   droppable: 'true',
  // },
  // {
  //   selector: ['.sortable > *'],
  //   draggable: 'true',

  // },
  // {
  //   selector: '.cloneable > *',
  //   cloneable: 'true',
  // },
];
window.elementConfig = elementConfig;

window.addEventListener('load', () => {
  dom.element(
    elementConfig
  )

})


//   dom.element([{
//     selector: ['.sortable'],
//     droppable: 'true',
//   },
//   {
//     selector: ['.sortable1> *'],
//     draggable: 'true',

//   }
//   ]),

//   dom.element([{
//     selector: ['.sortable1> *'],
//     draggable: 'true',

//   }]
//   )



// {   
//             selector: '[data-group_name]',
//             droppable: 'true',
//             // idGenerator: () => UUID(12),
//           },
//           {
//             selector: '.cloneable>*',
//             cloneable: 'true',
//             // idGenerator: () => UUID(12),
//           },
//           {
//             selector: '.sortable> *',
//             draggable: 'true',
//             // idGenerator: () => UUID(12),
//           }
