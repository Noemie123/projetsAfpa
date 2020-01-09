$('.mentionLegales').on('click', function () {
    $('.mentionsModal').css('display', 'block');
});
$('.close').on('click', function () {
    $('.mentionsModal').css('display', 'none');
});


$('.readMore').on('click', function () {
    if($('.txtPlus')[0].style.display === 'none' || $('.txtPlus')[0].style.display === '') {
        $('.txtPlus').css('display', 'block');
        $('.readMore').html('Lire moins');
    } else {
        $('.txtPlus').css('display', 'none');
        $('.readMore').html('Lire plus');
    }
});