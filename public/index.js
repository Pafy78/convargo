'use strict';

//list of truckers
//useful for ALL 5 exercises
var truckers = [{
    'id': 'f944a3ff-591b-4d5b-9b67-c7e08cba9791',
    'name': 'les-routiers-bretons',
    'pricePerKm': 0.05,
    'pricePerVolume': 5
}, {
    'id': '165d65ec-5e3f-488e-b371-d56ee100aa58',
    'name': 'geodis',
    'pricePerKm': 0.1,
    'pricePerVolume': 8.5
}, {
    'id': '6e06c9c0-4ab0-4d66-8325-c5fa60187cf8',
    'name': 'xpo',
    'pricePerKm': 0.10,
    'pricePerVolume': 10
}];

//list of current shippings
//useful for ALL exercises
//The `price` is updated from exercice 1
//The `commission` is updated from exercice 3
//The `options` is useful from exercice 4
var deliveries = [{
    'id': 'bba9500c-fd9e-453f-abf1-4cd8f52af377',
    'shipper': 'bio-gourmet',
    'truckerId': 'f944a3ff-591b-4d5b-9b67-c7e08cba9791',
    'distance': 100,
    'volume': 4,
    'options': {
        'deductibleReduction': false
    },
    'price': 0,
    'commission': {
        'insurance': 0,
        'treasury': 0,
        'convargo': 0
    }
}, {
    'id': '65203b0a-a864-4dea-81e2-e389515752a8',
    'shipper': 'librairie-lu-cie',
    'truckerId': '165d65ec-5e3f-488e-b371-d56ee100aa58',
    'distance': 650,
    'volume': 12,
    'options': {
        'deductibleReduction': true
    },
    'price': 0,
    'commission': {
        'insurance': 0,
        'treasury': 0,
        'convargo': 0
    }
}, {
    'id': '94dab739-bd93-44c0-9be1-52dd07baa9f6',
    'shipper': 'otacos',
    'truckerId': '6e06c9c0-4ab0-4d66-8325-c5fa60187cf8',
    'distance': 1250,
    'volume': 30,
    'options': {
        'deductibleReduction': true
    },
    'price': 0,
    'commission': {
        'insurance': 0,
        'treasury': 0,
        'convargo': 0
    }
}];

//list of actors for payment
//useful from exercise 5
const actors = [{
    'deliveryId': 'bba9500c-fd9e-453f-abf1-4cd8f52af377',
    'payment': [{
        'who': 'shipper',
        'type': 'debit',
        'amount': 0
    }, {
        'who': 'trucker',
        'type': 'credit',
        'amount': 0
    }, {
        'who': 'insurance',
        'type': 'credit',
        'amount': 0
    }, {
        'who': 'treasury',
        'type': 'credit',
        'amount': 0
    }, {
        'who': 'convargo',
        'type': 'credit',
        'amount': 0
    }]
}, {
    'deliveryId': '65203b0a-a864-4dea-81e2-e389515752a8',
    'payment': [{
        'who': 'shipper',
        'type': 'debit',
        'amount': 0
    }, {
        'who': 'trucker',
        'type': 'credit',
        'amount': 0
    }, {
        'who': 'insurance',
        'type': 'credit',
        'amount': 0
    }, {
        'who': 'treasury',
        'type': 'credit',
        'amount': 0
    }, {
        'who': 'convargo',
        'type': 'credit',
        'amount': 0
    }]
}, {
    'deliveryId': '94dab739-bd93-44c0-9be1-52dd07baa9f6',
    'payment': [{
        'who': 'shipper',
        'type': 'debit',
        'amount': 0
    }, {
        'who': 'trucker',
        'type': 'credit',
        'amount': 0
    }, {
        'who': 'treasury',
        'type': 'credit',
        'amount': 0
    }, {
        'who': 'insurance',
        'type': 'credit',
        'amount': 0
    }, {
        'who': 'convargo',
        'type': 'credit',
        'amount': 0
    }]
}];



function ComputePrice(){
    deliveries.forEach(function(deliverie){
        deliverie.price = GetPriceBase(deliverie);
        deliverie.price = GetPriceRemise(deliverie);
        deliverie = UpdateCommission(deliverie);
        deliverie = ApplyDeductibleOption(deliverie);
    });
}

function GetPriceBase(deliverie){
    var distance, volume, trucker;
    trucker = truckers.find(function(element){
        return element.id = deliverie.truckerId;
    });
    distance = trucker.pricePerKm * deliverie.distance;
    volume = trucker.pricePerVolume * deliverie.volume;
    return distance + volume;
}
function GetPriceRemise(deliverie){
    if(deliverie.volume > 25){
        return deliverie.price * 0.5;
    }
    else if(deliverie.volume > 10){
        return deliverie.price * 0.3;
    }
    else if(deliverie.volume > 5){
        return deliverie.price * 0.1;
    } 
    return deliverie.price;
}
function UpdateCommission(deliverie){
    var commission = deliverie.price * 0.3;
    
    deliverie.commission.insurance = commission / 2;
    deliverie.commission.treasury = parseInt(deliverie.distance / 500);
    deliverie.commission.convargo = commission - deliverie.commission.treasury - deliverie.commission.insurance;
    return deliverie;
}
function ApplyDeductibleOption(deliverie){
    deliverie.options.deductibleReduction = true;
    deliverie.price += deliverie.volume;
    return deliverie;
}




ComputePrice();


console.log(truckers);
console.log(deliveries);
console.log(actors);



