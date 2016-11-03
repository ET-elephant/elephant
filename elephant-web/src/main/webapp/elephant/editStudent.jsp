<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
	String id = request.getParameter("id");
	if (id == null) {
		id = "";
	}
%>
<form action="#" id="studentForm" class="form form-horizontal">
	<div class="form-body">
		<div class="row">
			<div class="col-md-12">
				<div class="form-group">
					<label class="control-label col-md-3">姓名：
						<span class="required"> * </span></label>
					<div class="col-md-9">
						<input type="text" class="form-control" name="name">
					</div>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-md-12">
				<div class="form-group">
					<label class="control-label col-md-3">编号：
						<span class="required"> * </span></label>
					<div class="col-md-9">
						<input type="text" class="form-control" name="code">
					</div>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-md-12">
				<div class="form-group">
					<label class="control-label col-md-3">性别：
						<span class="required"> * </span></label>
					<div class="col-md-9">
						<div class="radio-list" data-error-container="#form_sex_error">
							<label class="radio-inline">
								<input type="radio" name="sex" value="male"> 男
							</label>
							<label class="radio-inline">
								<input type="radio" name="sex" value="female"> 女
							</label>
						</div>
						<div id="form_sex_error"></div>
					</div>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-md-12">
				<div class="form-group">
					<label class="control-label col-md-3">年龄：
						<span class="required"> * </span></label>
					<div class="col-md-9">
						<input type="text" class="form-control" name="age">
					</div>
				</div>
			</div>
		</div>
		
		<div class="row">
			<div class="col-md-12">
				<div class="form-group">
					<label class="control-label col-md-3">出生日期：
						<span class="required"> * </span></label>
					<div class="col-md-9">
						<div class="input-group date birthday">
							<input type="text" class="form-control" readonly name="birthday">
                                                        <span class="input-group-btn">
                                                            <button class="btn default" type="button">
																<i class="fa fa-calendar"></i>
															</button>
                                                        </span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</form>
<script src="<%=request.getContextPath()%>/assets/pages/scripts/elephant/editStudent.js" type="text/javascript"></script>
<script type="text/javascript">
	$(function () {
		studentEdit.setPath("<%=request.getContextPath() %>");
		studentEdit.init("<%=id%>");
	});
</script>