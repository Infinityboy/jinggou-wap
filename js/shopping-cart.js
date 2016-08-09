/**
 * Desc: 购物车
 * Author: liangqi
 * Date: 16/6/15
 */
$(function () {
    var number = $('.number');
    var max = number.data('max'),
        current = number.find('.current-num'),
        minusElem = $('.btn-minus'),
        plusElem = $('.btn-plus'),
        totalPriceElem = $('.total-price'),
        numElem = $('.total-num'),
        price = number.data('price'),
        level = number.data('level');

    var currentVal = parseInt(current.text());
    if (currentVal) {
        if (currentVal == 1) {
            minusElem.addClass('disabled');
        } else if (currentVal == max) {
            plusElem.addClass('disabled');
        }
    }


    minusElem.on('click', function (e) {
        e.preventDefault();
        var currentVal = parseInt(current.text());
        if (currentVal) {
            currentVal -= level;
            if (currentVal <= 0) {
                currentVal = level;
                minusElem.addClass('disabled');
            }

            current.text(currentVal);
            numElem.text('x' + currentVal);
            totalPriceElem.text('¥ ' + (currentVal * price) + '.00');

            if (currentVal < max) {
                plusElem.removeClass('disabled');
            }
        }
    });

    plusElem.on('click', function (e) {
        e.preventDefault();
        var currentVal = parseInt(current.text());
        if (currentVal) {
            currentVal += level;
            if (currentVal >= max) {
                currentVal = max;
                plusElem.addClass('disabled');
            }

            current.text(currentVal);
            numElem.text('x' + currentVal);
            totalPriceElem.text('¥ ' + (currentVal * price) + '.00');


            if (currentVal > 1) {
                minusElem.removeClass('disabled');
            } else {

            }
        }
    });

    // 包尾
    $('btn-get-all').on('click', function (e) {
        e.preventDefault();
    })
});
