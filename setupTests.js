import raf from './tempPolyfills';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

// this is to indicate which adapter we need to use for enzyme
// this script will be run when running test script automatically
