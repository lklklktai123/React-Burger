import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NavigationItems from '../NavigationItems';
import React from 'react';
import NavigationItem from './NavigationItem';
configure({ adapter: new Adapter() });
describe('<NavigationItems />', () => {
  let wrapper;
  beforeEach(() => (wrapper = shallow(<NavigationItems />)));
  it('nen hien thi 2 <NavigationsItem/> neu chua dang nhap', () => {
    expect(wrapper.find(NavigationItem)).toHaveLength(2);
  });
  it('nen hien thi 3 <NavigationsItem/> neu da dang nhap', () => {
    //  wrapper = shallow(<NavigationItems isAuthenticated />);
    wrapper.setProps({ isAuthenticated: true });
    expect(wrapper.find(NavigationItem)).toHaveLength(3);
  });
  it('nen hien thi 3 <NavigationsItem/> neu da dang nhap', () => {
    wrapper.setProps({ isAuthenticated: true });
    expect(
      wrapper.contains(<NavigationItem link="/logout">Logout</NavigationItem>)
    ).toEqual(true);
  });
});
