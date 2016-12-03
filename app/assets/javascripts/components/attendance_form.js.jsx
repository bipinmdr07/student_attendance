let AttendanceForm = React.createClass({
	getInitialState() {
		return {
			studentNumber: "",
			studentName: "",
			record: ""
		}
	},

	handleChange(e){
		e.preventDefault();

		this.setState({studentNumber: e.target.value})
	},

	handleSubmit(e){
		e.preventDefault();

		if (confirm(`生徒番号${this.state.studentNumber}でお間違いないでしょうか？`)) {
			$.ajax({
				url: "/attendance_records",
				type: "POST",
				dataType: "JSON",
				context: "this",
				data: {
				 attendance_record: {
				 	student_number: this.state.studentNumber 
				 }
				},
				success: (data) => {
					let studentName = data.student.last_name + data.student.first_name
					this.setState({record: data.record, studentName: studentName});
					$('#result').foundation('open');	
					setTimeout(() => {
						$('#result').foundation('close');
					}, 2000);

				}
			})
		}

		
	},

	handleUpdate(number){
		let studentNumber = this.state.studentNumber += number;
		this.setState({studentNumber: studentNumber});
	},

	handleDeleteChar(){
		let studentNumber = this.state.studentNumber.slice(0, -1);
		this.setState({studentNumber: studentNumber});
	},

	render(){
		return (
			<div>
				<form>
				  <div className="row">
				    <div className="medium-6 medium-offset-3 small-12 columns">			      
				    	<div className="input-group">
							  <input className="input-group-field" 
							  			 type="number" 
							  			 placeholder="学生番号を入力"
							  			 onChange={this.handleChange}
							  			 value={this.state.studentNumber} />	
							  <div className="input-group-button">
							    <input type="submit" 
							    			 className="button" 
							    			 onClick={this.handleSubmit} 
							    			 value="記録する" />
							  </div>
							</div>
				      		      
				    </div>			    
				  </div>
				</form>

				<AttendanceFormButtons handleUpdate={this.handleUpdate} handleDeleteChar={this.handleDeleteChar}/>

				<Result studentName={this.state.studentName} record={this.state.record} />
			</div>
		)
	}
});
