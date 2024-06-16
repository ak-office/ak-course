$(document).ready(function () {
  var dftr = $('select.dftr'),
    headerCount = $('#headerCount');
  headerCount.html('select a filter or use search');
  dftr.on('change', function () {
    dftr.attr('disabled', 'disabled');
    var records = $('#tvvTable').find('.tvv-item');
    records.hide();
    var critriaAttributes = [];
    dftr.each(function () {
      var $this = $(this),
        $selectedLength = $this.find(':selected').length,
        $critriaAttribute = '';
      if ($selectedLength > 0 && $this.val() != '0') {
        if ($selectedLength == 1) {
          $critriaAttribute += '[data-' + $this.data('attribute') + '*="' + $this.val() + '"]';
        } else {
          var $startDataAttribute = '[data-' + $this.data('attribute') + '*="',
            $endDataAttribute = '"]',
            $selectedValues = $this.val().toString();
          $critriaAttribute += $startDataAttribute + $selectedValues.replaceAll(',', ($endDataAttribute + ',' + $startDataAttribute)) + $endDataAttribute;
        }
        critriaAttributes.push($critriaAttribute);
      }
    });
    var $showRecords = records;
    if (critriaAttributes.length > 0) {
      $.each(critriaAttributes, function (i, filterValue) {
        $showRecords = $showRecords.filter(filterValue);
      });
    }
    $showRecords.show();
    headerCount.html($showRecords.length + ' channels filtered');
    dftr.removeAttr('disabled');
    $(".fin").val('');
  });
  $(".fin").keyup(function () {
    var filter = $(this).val(),
      count = 0;
    $('select.dftr').prop('selectedIndex', 0);
    $(".tvv-item").each(function () {
      if ($(this).text().search(new RegExp(filter, "i")) < 0) {
        $(this).fadeOut();
      } else {
        $(this).show();
        count++;
      }
    });
  });
});