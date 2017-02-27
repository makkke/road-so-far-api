import test from 'ava'

import {
  convertGallonsToLiters,
  convertLitersToGallons,
  mapQuantityToLiters,
} from '../../../src/fuelPurchases/utils'

test('convertGallonsToLiters: should convert us gallons to liters', (t) => {
  let liters = convertGallonsToLiters(10)
  t.is(liters, 37.85411784)

  liters = convertGallonsToLiters(55)
  t.is(liters, 208.19764812)

  liters = convertGallonsToLiters(0)
  t.is(liters, 0)
})

test('convertLitersToGallons: should convert liters to us gallons', (t) => {
  let gallons = convertLitersToGallons(37.85411784)
  t.is(gallons, 10)

  gallons = convertLitersToGallons(208.19764812)
  t.is(gallons, 55)

  gallons = convertLitersToGallons(0)
  t.is(gallons, 0)
})

test('mapQuantityToLiters: should convert quantity to liters', (t) => {
  let liters = mapQuantityToLiters({ value: 100, unit: 'LITER' })
  t.is(liters, 100, 'should convert liters')

  liters = mapQuantityToLiters({ value: 100, unit: 'GALLON' })
  t.is(liters, 378.5411784, 'should convert gallons')
})
