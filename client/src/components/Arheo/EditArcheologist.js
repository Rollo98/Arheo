// import React, { Component } from "react";
// import Axios from "axios";
// import { BE_Host } from "../../config";
// import { connect } from "react-redux";

// class EditArcheologist extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       fn: [],
//       firstName: "",
//       lastName: "",
//       birthDay: { day: "", month: "", year: "" },
//       deathDay: { day: "", month: "", year: "" },
//       isDead: false,
//       Institutii: [{ id: 1, text: "", start: "", end: "" }],
//       Specializarii: [{ id: 1, text: "", start: "", end: "" }],
//       Studii: [{ id: 1, text: "", start: "", end: "" }],
//       Lucrari: "",
//       Santier: [{ id: 1, text: "", start: "", end: "" }],
//       Domeniu: [{ id: 1, text: "" }],
//       Observatii: "",
//       autor: "",
//       fileObj: {}
//     };
//   }

//   componentWillMount() {
//     Axios.get(
//       `http://${BE_Host}/archeologist/get/${this.props.firstName}/${
//         this.props.lastName
//       }`
//     ).then(Response => {
//       this.setState({
//         firstName: Response.data.archeologists[0].firstName,
//         lastName: Response.data.archeologists[0].lastName,
//         birthDay: Response.data.archeologists[0].birthDay,
//         deathDay: Response.data.archeologists[0].deathDay,
//         Institutii: Response.data.archeologists[0].Institutii,
//         Specializarii: Response.data.archeologists[0].Specializarii,
//         Studii: Response.data.archeologists[0].Studii,
//         Lucrari: Response.data.archeologists[0].Lucrari,
//         Santier: Response.data.archeologists[0].Santier,
//         Domeniu: Response.data.archeologists[0].Domeniu,
//         Observatii: Response.data.archeologists[0].Observatii,
//         autor: Response.data.archeologists[0].autor
//       });
//     });
//   }
//   render() {
//     console.log("archeee", this.state);
//     return (
//       <div>
//         {this.props.role.includes("writer") ||
//         this.props.role.includes("admin") ? (
//           //work place here
//           <form onSubmit={this.sendChanges}>
//             <div className="form-row">
//               <div className="col">
//                 <label htmlFor="firstName">Prenume:</label>
//                 <input
//                   id="firstName"
//                   type="text"
//                   name="firstName"
//                   className="form-control"
//                   value={this.state.firstName}
//                   onChange={e => this.setState({ firstName: e.target.value })}
//                 />
//               </div>
//               <div className="col">
//                 <label htmlFor="lastName">Nume Familie:</label>
//                 <input
//                   id="lastName"
//                   type="text"
//                   name="lastName"
//                   className="form-control"
//                   value={this.state.lastName}
//                   onChange={e => this.setState({ lastName: e.target.value })}
//                 />
//               </div>
//             </div>
//             <div className="form-row">
//               <div className="col">
//                 <label htmlFor="birthDay">Zi Nastere:</label>
//                 <input
//                   className="dateInput m-1 text-center form-control"
//                   placeholder="zi"
//                   value={this.state.birthDay.day}
//                   onChange={e => {
//                     this.state.birthDay.day = e.target.value;
//                     this.setState({ birthDay: this.state.birthDay });
//                   }}
//                 />
//                 <input
//                   className="dateInput m-1 text-center form-control"
//                   placeholder="luna"
//                   value={this.state.birthDay.month}
//                   onChange={e => {
//                     this.state.birthDay.month = e.target.value;
//                     this.setState({ birthDay: this.state.birthDay });
//                   }}
//                 />
//                 <input
//                   className="dateInput m-1 text-center form-control"
//                   placeholder="an"
//                   value={this.state.birthDay.year}
//                   onChange={e => {
//                     this.state.birthDay.year = e.target.value;
//                     this.setState({ birthDay: this.state.birthDay });
//                   }}
//                 />
//               </div>
//               {this.state.deathDay !== undefined ? (
//                 <div className="col">
//                   <label htmlFor="deathDay">Decedat la:</label>
//                   <input
//                     className="dateInput m-1 text-center form-control"
//                     placeholder="zi"
//                     value={this.state.deathDay.day}
//                     onChange={e => {
//                       this.state.deathDay.day = e.target.value;
//                       this.setState({ deathDay: this.state.deathDay });
//                     }}
//                   />
//                   <input
//                     className="dateInput m-1 text-center form-control"
//                     placeholder="luna"
//                     value={this.state.deathDay.month}
//                     onChange={e => {
//                       this.state.deathDay.month = e.target.value;
//                       this.setState({ deathDay: this.state.deathDay });
//                     }}
//                   />
//                   <input
//                     className="dateInput m-1 text-center form-control"
//                     placeholder="an"
//                     value={this.state.deathDay.year}
//                     onChange={e => {
//                       this.state.deathDay.year = e.target.value;
//                       this.setState({ deathDay: this.state.deathDay });
//                     }}
//                   />
//                 </div>
//               ) : null}
//             </div>
//             <label htmlFor="Institutii">Institutii:</label>
//             {this.state.Institutii.map(inst => {
//               return (
//                 <>
//                   <br />
//                   <div
//                     id="instform"
//                     className="workForm col-md-11"
//                     key={inst.id}
//                   >
//                     <input
//                       type="text"
//                       id="title"
//                       name="title"
//                       className="form-control col-md-10"
//                       value={inst.text}
//                       onChange={e => {
//                         this.state.Institutii[inst.id - 1].text =
//                           e.target.value;
//                         this.setState({ Institutii: this.state.Institutii });
//                       }}
//                     />
//                     <label htmlFor="start">Inceput:</label>
//                     <input
//                       className="text-center m-1"
//                       placeholder="zi/luna/an"
//                       value={inst.start}
//                       onChange={e => {
//                         this.state.Institutii[inst.id - 1].start =
//                           e.target.value;
//                         this.setState({ Institutii: this.state.Institutii });
//                       }}
//                     />
//                     <label htmlFor="end">Sfarsit:</label>
//                     <input
//                       placeholder="zi/luna/an"
//                       className="text-center m-1"
//                       value={inst.end}
//                       onChange={e => {
//                         this.state.Institutii[inst.id - 1].end = e.target.value;
//                         this.setState({ Institutii: this.state.Institutii });
//                       }}
//                     />
//                   </div>
//                 </>
//               );
//             })}
//             <label htmlFor="Specializarii">Specializarii:</label>
//             {this.state.Specializarii.map(spec => {
//               return (
//                 <>
//                   <br />
//                   <div id="specform" className="workForm col-md-11">
//                     <input
//                       type="text"
//                       id="title"
//                       name="title"
//                       className="form-control col-md-10"
//                       value={spec.text}
//                       onChange={e => {
//                         this.state.Specializarii[spec.id - 1].text =
//                           e.target.value;
//                         this.setState({
//                           Specializarii: this.state.Specializarii
//                         });
//                       }}
//                     />
//                     <label htmlFor="start">Inceput:</label>
//                     <input
//                       className="text-center m-1"
//                       placeholder="zi/luna/an"
//                       value={spec.start}
//                       onChange={e => {
//                         this.state.Specializarii[spec.id - 1].start =
//                           e.target.value;
//                         this.setState({
//                           Specializarii: this.state.Specializarii
//                         });
//                       }}
//                     />
//                     <label htmlFor="end">Sfarsit:</label>
//                     <input
//                       placeholder="zi/luna/an"
//                       className="text-center m-1"
//                       value={spec.end}
//                       onChange={e => {
//                         this.state.Specializarii[spec.id - 1].end =
//                           e.target.value;
//                         this.setState({
//                           Specializarii: this.state.Specializarii
//                         });
//                       }}
//                     />
//                   </div>
//                 </>
//               );
//             })}
//             <label htmlFor="Studii">Studii:</label>
//             {this.state.Studii.map(univ => {
//               return (
//                 <>
//                   <br />
//                   <div id="univform" className="workForm col-md-11">
//                     {/* <label htmlFor="title">Studiu:</label> */}
//                     <input
//                       type="text"
//                       id="title"
//                       name="title"
//                       className="form-control col-md-10"
//                       value={univ.text}
//                       onChange={e => {
//                         this.state.Studii[univ.id - 1].text = e.target.value;
//                         this.setState({ Studii: this.state.Studii });
//                       }}
//                     />
//                     <label htmlFor="start">Inceput:</label>
//                     <input
//                       className="text-center m-1"
//                       placeholder="zi/luna/an"
//                       value={univ.start}
//                       onChange={e => {
//                         this.state.Studii[univ.id - 1].start = e.target.value;
//                         this.setState({ Studii: this.state.Studii });
//                       }}
//                     />
//                     <label htmlFor="end">Sfarsit:</label>
//                     <input
//                       placeholder="zi/luna/an"
//                       className="text-center m-1"
//                       value={univ.end}
//                       onChange={e => {
//                         this.state.Studii[univ.id - 1].end = e.target.value;
//                         this.setState({ Studii: this.state.Studii });
//                       }}
//                     />
//                   </div>
//                 </>
//               );
//             })}
//             <label htmlFor="Santier">Santier:</label>
//             {this.state.Santier.map(sant => {
//               return (
//                 <>
//                   <br />
//                   <div id="santform" className="workForm col-md-11">
//                     <input
//                       type="text"
//                       id="title"
//                       name="title"
//                       className="form-control col-md-10"
//                       value={sant.text}
//                       onChange={e => {
//                         this.state.Santier[sant.id - 1].text = e.target.value;
//                         this.setState({ Santier: this.state.Santier });
//                       }}
//                     />
//                     <label htmlFor="start">Inceput:</label>
//                     <input
//                       className="text-center m-1"
//                       placeholder="zi/luna/an"
//                       value={sant.start}
//                       onChange={e => {
//                         this.state.Santier[sant.id - 1].start = e.target.value;
//                         this.setState({ Santier: this.state.Santier });
//                       }}
//                     />
//                     <label htmlFor="end">Sfarsit:</label>
//                     <input
//                       placeholder="zi/luna/an"
//                       className="text-center m-1"
//                       value={sant.end}
//                       onChange={e => {
//                         this.state.Santier[sant.id - 1].end = e.target.value;
//                         this.setState({ Santier: this.state.Santier });
//                       }}
//                     />
//                   </div>
//                 </>
//               );
//             })}
//             <label htmlFor="Domeniu">Domeniul specializarii:</label>
//             {this.state.Domeniu.map(dom => {
//               return (
//                 <>
//                   <br />
//                   <div id="domform" className="workForm col-md-11">
//                     <input
//                       type="text"
//                       id="title"
//                       name="title"
//                       className="form-control col-md-10"
//                       value={dom.text}
//                       onChange={e => {
//                         this.state.Domeniu[dom.id - 1].text = e.target.value;
//                         this.setState({ Domeniu: this.state.Domeniu });
//                       }}
//                     />
//                   </div>
//                 </>
//               );
//             })}
//             <label htmlFor="workform">Lucrari:</label>
//             <br />
//             <>
//               <div id="workform" className="workForm col-md-11">
//                 <textarea
//                   type="text"
//                   id="text"
//                   name="text"
//                   className="form-control col-md-10"
//                   value={this.state.Lucrari}
//                   onChange={e => {
//                     this.setState({ Lucrari: e.target.value });
//                   }}
//                 />
//               </div>
//             </>
//             <label htmlFor="obsform">Observatii:</label>
//             <br />
//             <>
//               <div id="obsform" className="workForm col-md-11">
//                 <textarea
//                   type="text"
//                   id="text"
//                   name="text"
//                   className="form-control col-md-10"
//                   value={this.state.Observatii}
//                   onChange={e => {
//                     this.setState({ Observatii: e.target.value });
//                   }}
//                 />
//               </div>
//             </>

//             <label htmlFor="autorform">Autor:</label>
//             <br />
//             <>
//               <div id="autorform" className="workForm col-md-11">
//                 <input
//                   type="text"
//                   id="text"
//                   name="text"
//                   className="form-control col-md-10"
//                   // value={this.state.Autor}
//                   onChange={e => {
//                     this.setState({ autor: e.target.value });
//                   }}
//                 />
//               </div>
//             </>
//             {this.props.errorMessage ? (
//               <div className="alert  alert-danger">
//                 {this.props.errorMessage}
//               </div>
//             ) : null}
//             <div
//               className="btn mt-2 saveButton btn-primary"
//               onClick={() => {
//                 this.sendChanges();
//               }}
//             >
//               Edit
//             </div>
//           </form>
//         ) : (
//           //ends here
//           this.props.history.push("/")
//         )}
//       </div>
//     );
//   }
// }
// function MapStateToProps(state) {
//   return {
//     role: state.auth.role
//   };
// }

// export default connect(MapStateToProps)(EditArcheologist);
