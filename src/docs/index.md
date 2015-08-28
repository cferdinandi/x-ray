## With a button

<form>
	<div>
		<label>Username</label>
		<input type="text">
	</div>
	<div>
		<label>Password</label>
		<input id="pw1" type="password">
	</div>
	<div>
		<button class="js-xray-1" hidden></button>
	</div>
</form>

<br><br>

## With a checkbox

<form>
	<div>
		<label>Username</label>
		<input type="text">
	</div>
	<div>
		<label>Password</label>
		<input id="pw2" type="password">
	</div>
	<div>
		<label hidden>
			<input class="js-xray-2" type="checkbox" checked>
			Show password
		</label>
	</div>
</form>

<br><br>

## Multiple passwords

<form>
	<div>
		<label>Old Password</label>
		<input class="pw3" type="password">
	</div>
	<div>
		<label>New Password</label>
		<input class="pw3" type="password">
	</div>
	<div>
		<label hidden>
			<input type="checkbox" class="js-xray-3" checked>
			Show passwords
		</label>
	</div>
</form>