import { BurgerBuider } from './BurgerBuilder';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import BuildControls from '../../components/Layout/Burger/BuildControls/BuildControls';
configure({ adapter: new Adapter() });
describe('<Burger Buider />', () => {
  let wrapper;
  beforeEach(
    () => (wrapper = shallow(<BurgerBuider onInitIngredients={() => {}} />))
  );
  it('nen hien thi  <BuildControls/> khi co ingredients', () => {
    wrapper.setProps({ ings: { salad: 0 } });
    expect(wrapper.find(BuildControls)).toHaveLength(1);
  });
});
