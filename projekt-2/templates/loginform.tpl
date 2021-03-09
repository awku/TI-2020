<form id="logowanieform" method="post">
    <label for="loginEmail">E-mail:</label><span class="val" id="vallogemail"></span><br>
    <input type="text" id="loginEmail" name="loginEmail"><br>
    <label for="loginPassword">Hasło:</label><span class="val" id="vallogpswd"></span><br>
    <input type="password" id="loginPassword" name="loginPassword"><br>
    <input type="button" class="btn" onclick="_login(this.form)" value="Zaloguj się">
</form>
