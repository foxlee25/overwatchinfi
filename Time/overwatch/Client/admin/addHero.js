/**
 * Created by jinz2 on 5/22/16.
 */

$(function(){

    $('#submitHeroForm').click(function(){
        var heroModel = {};
        var key = $('#heroForm').find('input[name="heroKey"]').val();
        if(key)
            heroModel.key = key;
        var heroname = $('#heroForm').find('input[name="heroName"]').val();
        if(heroname)
            heroModel.heroname = heroname;
        var heroRole = $('#heroForm').find('input[name="heroRole"]').val();
        if(heroRole)
            heroModel.heroRole = heroRole;
        var heroDesc = $('#heroForm').find('input[name="heroDesc"]').val();
        if(heroDesc)
            heroModel.heroDesc = heroDesc;
        var heroDifficulty = $('#heroForm').find('input[name="heroDifficulty"]').val();
        if(heroDifficulty)
            heroModel.heroDifficulty = heroDifficulty;
        var heroAbility1 = $('#heroForm').find('input[name="heroAbility1"]').val();
        if(heroAbility1)
            heroModel.heroAbility1 = heroAbility1;
        var heroAbility2 = $('#heroForm').find('input[name="heroAbility2"]').val();
        if(heroAbility2)
            heroModel.heroAbility2 = heroAbility2;
        var heroAbility3 = $('#heroForm').find('input[name="heroAbility3"]').val();
        if(heroAbility3)
            heroModel.heroAbility3 = heroAbility3;
        var heroAbility4 = $('#heroForm').find('input[name="heroAbility4"]').val();
        if(heroAbility4)
            heroModel.heroAbility4 = heroAbility4;
        var heroAbility5 = $('#heroForm').find('input[name="heroAbility5"]').val();
        if(heroAbility5)
            heroModel.heroAbility5 = heroAbility5;
        var heroAbility6 = $('#heroForm').find('input[name="heroAbility6"]').val();
        if(heroAbility6)
            heroModel.heroAbility6 = heroAbility6;
        var heroAbility7 = $('#heroForm').find('input[name="heroAbility7"]').val();
        if(heroAbility7)
            heroModel.heroAbility7 = heroAbility7;
        var heroAbility8 = $('#heroForm').find('input[name="heroAbility8"]').val()
        if(heroAbility8)
            heroModel.heroAbility8 = heroAbility8;
        var url= '/hero/addHeroDetails';
        var serverData = {data : heroModel};
        Ajax.post(url,serverData);
    });


});