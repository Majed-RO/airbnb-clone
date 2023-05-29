'use client';

import { usePathname, useSearchParams } from 'next/navigation';

import { FaUmbrellaBeach } from '@react-icons/all-files/fa/FaUmbrellaBeach'; 
import {FaMountain } from '@react-icons/all-files/fa/FaMountain'; 
import {  FaSwimmingPool } from '@react-icons/all-files/fa/FaSwimmingPool'; 
import { FaSkiing } from '@react-icons/all-files/fa/FaSkiing';


import {GiBarn} from  '@react-icons/all-files/gi/GiBarn';
import {GiBoatFishing} from  '@react-icons/all-files/gi/GiBoatFishing';
import {GiCactus} from  '@react-icons/all-files/gi/GiCactus';
import {GiCastle} from  '@react-icons/all-files/gi/GiCastle';
import {GiCaveEntrance} from  '@react-icons/all-files/gi/GiCaveEntrance';
import {GiForestCamp} from  '@react-icons/all-files/gi/GiForestCamp';
import {GiIsland} from  '@react-icons/all-files/gi/GiIsland';
import {GiWindmill} from  '@react-icons/all-files/gi/GiWindmill';
import { GiCutDiamond } from '@react-icons/all-files/gi/GiCutDiamond';

import { IoSnow } from '@react-icons/all-files/io5/IoSnow';
import { BsHouse } from '@react-icons/all-files/bs/BsHouse';


import Container from '../Container';
import CategoryBox from '../CategoryBox';

export const categories = [
	{
		label: 'Beach',
		icon: FaUmbrellaBeach,
		description: 'This property is close to the beach!'
	},
	{
		label: 'Windmills',
		icon: GiWindmill,
		description: 'This property is has windmills!'
	},
	{
		label: 'Modern',
		icon: BsHouse,
		description: 'This property is modern!'
	},
	{
		label: 'Countryside',
		icon: FaMountain,
		description: 'This property is in the countryside!'
	},
	{
		label: 'Pools',
		icon: FaSwimmingPool,
		description: 'This is property has a beautiful pool!'
	},
	{
		label: 'Islands',
		icon: GiIsland,
		description: 'This property is on an island!'
	},
	{
		label: 'Lake',
		icon: GiBoatFishing,
		description: 'This property is near a lake!'
	},
	{
		label: 'Skiing',
		icon: FaSkiing,
		description: 'This property has skiing activities!'
	},
	{
		label: 'Castles',
		icon: GiCastle,
		description: 'This property is an ancient castle!'
	},
	{
		label: 'Caves',
		icon: GiCaveEntrance,
		description: 'This property is in a spooky cave!'
	},
	{
		label: 'Camping',
		icon: GiForestCamp,
		description: 'This property offers camping activities!'
	},
	{
		label: 'Arctic',
		icon: IoSnow,
		description: 'This property is in arctic environment!'
	},
	{
		label: 'Desert',
		icon: GiCactus,
		description: 'This property is in the desert!'
	},
	{
		label: 'Barns',
		icon: GiBarn,
		description: 'This property is in a barn!'
	},
	{
		label: 'Lux',
		icon: GiCutDiamond,
		description: 'This property is brand new and luxurious!'
	}
];

const Categories = () => {

  const params = useSearchParams();
  const category = params.get('category')
  const pathname = usePathname();

  const isMainPage = pathname === '/'

  if(!isMainPage) {
    return null
  }
	return (
		<Container>
			<div className="pt-4 flex flex-row items-center justify-between overflow-x-auto">
				{categories.map(item => (
					<CategoryBox
						key={item.label}
						label={item.label}
						selected={category === item.label}
						icon={item.icon}
					/>
				))}
			</div>
		</Container>
	);
};

export default Categories;
