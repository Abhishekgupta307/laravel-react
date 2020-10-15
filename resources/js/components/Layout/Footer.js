import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import api from './common/api';
import ParseString from './helpers/Dom'
export default class Footer extends Component {

	constructor(props) {
		super(props);
		this.state = {
			analyticDays: 7,
		}
	}

	handleActivetab = (e, activetab) => {
		e.preventDefault();
		let stateCopy = Object.assign({}, this.state);
		stateCopy.analyticDays = activetab;
		this.setState(stateCopy, function () {
			this.props.HandelAnalyticData(activetab);
		});
	}

	showActiveTab = (active) => {
		return active == this.state.analyticDays ? "active" : "";
	}

	render() {

		var pathArray = ["fdata", "/crew/profile", "/crew/gallery", "/crew/qualification", "/crew/resume", "/crew/history", "/crew/documents"];
		var pathVal = pathArray.indexOf(window.location.pathname);
		let classFooter = (pathVal > 0) ? 'fix_footer' : 'fix_footer gray';
		let { showAnalytcs } = this.props;
		var Loader = require('react-loader');
		const {packageExists} = this.props;
		const {packageData} = this.props;
		const {analyticData} = this.props;
		
		return (

			<div className={classFooter}>
				<div className="container">
					<p className="row"><span className="col-sm-4"><a href="#"><i className="fa fa-copyright"></i> {new Date().getFullYear()}</a></span>
						{pathVal > 0 &&
							<span className="col-sm-4 text-center"><a href="javascript:void(0)" className="analytic_btn" onClick={this.props.handelShowAnalytic} ><i className="fa fa-angle-down" ></i> Analytics</a></span>
						}
					</p>
					{pathVal > 0 &&
						<div className="analytic_block" style={{ display: showAnalytcs ? "block" : "none" }}>
							<div className="container">
								{packageExists==true &&
									<h4>Profile performance over time: <a href="#" className={this.showActiveTab(7)} activetab="7" onClick={(e) => this.handleActivetab(e, 7)}>7 Days</a> <a className={"show" + this.state.analyticDays, this.showActiveTab(14)} href="#" activetab="14" onClick={(e) => this.handleActivetab(e, 14)} >14 Days</a> <a activetab="30" href="#" className={"show" + this.state.analyticDays, this.showActiveTab(30)} onClick={(e) => this.handleActivetab(e, 30)}>30 Days</a> </h4>
								}
								{packageExists==false &&
									<>
										{this.props.msg!="" &&
											<div className={"alert "+this.props.msgType}  style={{textAlign:'center',marginTop:'20px'}} role="alert">
												{this.props.msg}
											</div>
										}
										<div className={"analytic_head "+packageData.addon_color}>
											<span className="right_btn" style={{padding:'0px !important'}}><input type="button" className="btn " onClick={()=>this.props.buyPackage(this.state.analyticDays)} value="Buy Now!" /></span>
											<h3 className="">{packageData.package_name}<strong>{packageData.price} {localStorage.getItem('VERIFY_CURRENCY')}</strong></h3>
											<p dangerouslySetInnerHTML={{__html:packageData.description}}></p>
										</div>
									</>
								}
								<div className="row">
									{(this.props.loaded == false) &&
										<Loader loaded={false} lines={13} length={20} width={10} radius={30}
										corners={1} rotate={0} direction={1} color="#000" speed={1}
										trail={60} shadow={false} hwaccel={false} className="spinner"
										zIndex={2e9} top="50%" left="50%" scale={1.00}
										loadedClassName="loadedContent" />
									}
									<div className="col-sm-6">
										<ul >
											<li># of search appearances {packageExists==true?":":""} <strong>{typeof analyticData.searches != "undefined" ? analyticData.searches : ""}</strong></li>

											<li># of profile views {packageExists==true?":":""} <strong>{typeof analyticData.views != "undefined" ? analyticData.views : ""}</strong></li>

											<li># of CV views {packageExists==true?":":""} <strong>{typeof analyticData.cv_views != "undefined" ? analyticData.cv_views : ""}</strong></li>

											<li># of CV downloads {packageExists==true?":":""} <strong>{typeof analyticData.cv_download != "undefined" ? analyticData.cv_download : ""}</strong></li>

											<li># of video views {packageExists==true?":":""} <strong>{typeof analyticData.video_views != "undefined" ? analyticData.video_views : ""}</strong></li>

											<li># of picture views {packageExists==true?":":""} <strong>{typeof analyticData.picture_views != "undefined" ? analyticData.picture_views : ""}</strong></li>
										</ul>

									</div>
									<div className="col-sm-6">
										<ul>
											<li># of times your primary position was searched {packageExists==true?":":""}  <strong>{typeof analyticData.position_searched != "undefined" ? analyticData.position_searched : ""}</strong></li>

											<li># of job postings for your primary position {packageExists==true?":":""}  <strong>{typeof analyticData.job_posting != "undefined" ? analyticData.job_posting : ""}</strong></li>

											<li># of times your profile was sent as a potential match {packageExists==true?":":""}  <strong>{typeof analyticData.sent_potential != "undefined" ? analyticData.sent_potential : ""}</strong></li>

											<li># of times your full profile was unlocked {packageExists==true?":":""}  <strong>{typeof analyticData.profile_unlocked != "undefined" ? analyticData.profile_unlocked : ""}</strong></li>

											<li># of times your documents were opened/downloaded {packageExists==true?":":""}  <strong>{typeof analyticData.ducuments != "undefined" ? analyticData.ducuments : ""}</strong></li>

											<li># of times you were shortlisted {packageExists==true?":":""}  <strong>{typeof analyticData.profile_shortlisted != "undefined" ? analyticData.profile_shortlisted : ""}</strong></li>
										</ul>

									</div>
								</div>

							</div>
						</div>
					}
					
				</div>

			</div>
		);
	}
}