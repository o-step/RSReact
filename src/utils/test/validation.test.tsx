import { describe } from 'vitest';
import {
  getFileExtension,
  hasNumber,
  tooLong,
  tooShort,
  isFutureDate,
  getShortFileName,
  isValidFile,
  isValidGender,
  isValidCheckboxTerm,
  isValidName,
} from '../validation';
import assert from 'assert';

describe('Validation functions', () => {
  it('test isValidName', () => {
    assert.equal(isValidName(undefined), 'field cannot be empty');
    assert.equal(isValidName('Ja5ne'), "name mustn't contain numbers");
    assert.equal(isValidName('j'), 'name must be of adequate length');
    assert.equal(isValidName('Jane'), '');
  });

  it('test hasNumber', () => {
    assert.equal(hasNumber('gjhs6'), true);
    assert.equal(hasNumber('Jane'), false);
  });

  it('test tooLong', () => {
    assert.equal(tooLong('dddds,hfghsjerlgjrltgjldrkjtgdrjtg,jdf,gjdhf'), true);
    assert.equal(tooLong('Jane'), false);
  });

  it('test tooShort', () => {
    assert.equal(tooShort('John Smith'), false);
    assert.equal(tooShort('J'), true);
  });

  it('test isFutureDate', () => {
    assert.equal(isFutureDate('fake date'), false);
    assert.equal(isFutureDate('1994-09-12'), false);
    assert.equal(isFutureDate('2110-09-12'), true);
  });

  it('test getShortFileName', () => {
    assert.equal(getShortFileName(undefined), '');
    assert.equal(getShortFileName('image.jpg'), 'image.jpg');
    assert.equal(getShortFileName('imageimageimageimage.png'), 'imageim...png');
    assert.equal(getShortFileName('im.age.jpg'), 'im.age.jpg');
  });

  it('test isValidFile', () => {
    assert.equal(isValidFile('image.jpg'), '');
    assert.equal(isValidFile('imageimageimageimage.png', 'text.jpeg'), '');
    assert.equal(isValidFile(undefined), 'file not selected');
  });

  it('test getFileExtension', () => {
    assert.equal(getFileExtension('thebestimage.tsx'), 'tsx');
  });

  it('test isValidGender', () => {
    assert.equal(isValidGender(false, false), 'select gender please');
    assert.equal(isValidGender(true, false), '');
    assert.equal(isValidGender(false, true), '');
  });

  it('test isValidCheckboxTerm', () => {
    assert.equal(isValidCheckboxTerm(false), 'Prerequisite for receiving our services');
    assert.equal(isValidCheckboxTerm(true), '');
  });
});
