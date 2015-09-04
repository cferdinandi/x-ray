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
		<button class="x-ray" data-x-ray="#pw1" data-default="show">
			<span class="x-ray-show" data-x-ray-show>Show Password</span>
			<span class="x-ray-hide" data-x-ray-hide>Hide Password</span>
		</button>
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
		<label class="x-ray">
			<input type="checkbox" data-x-ray="#pw2" data-default="show" checked>
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
		<label class="x-ray">
			<input type="checkbox" data-x-ray=".pw3" data-default="show" checked>
			Show passwords
		</label>
	</div>
</form>