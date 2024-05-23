import { Button, Card, Input, Listbox, ListboxItem, ListboxSection, Select, SelectItem } from '@nextui-org/react';
import { AnimatePresence, motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import { UnitsType } from '../../../types/types';

const MyComponent = () => {
	const [toggleMenu, setToggleMenu] = useState(false);
	const [selectedAvoidKeys, setSelectedAvoidKeys] = useState<Set<any>>(new Set([]));
	const [selectedPreferenceKeys, setSelectedPreferenceKeys] = useState<Set<any>>(new Set(['recommended']));
	const [maximumSpeed, setMaximumSpeed] = useState<string>()
	const [selectedUnit, setSelectedUnit] = useState<UnitsType>('m')
	const units = ['m', 'km', 'mi']

	const selectedValue = useMemo(
		() => Array.from(selectedAvoidKeys).join(","),
		[selectedAvoidKeys]
	);

	return (
		<Card>
			<Button variant='shadow' onClick={() => setToggleMenu(prev => !prev)} color={toggleMenu ? 'success' : 'default'}>
				Options
			</Button>
			<AnimatePresence>
				{toggleMenu && (
					<motion.div
						initial={{ opacity: 0, height: 0 }}
						animate={{ opacity: 1, height: 'auto' }}
						exit={{ opacity: 0, height: 0 }}
						transition={{ duration: 0.15 }}
						className='flex w-full flex-col'
					>
						<div className='inline-flex w-full  pt-4'>
							<div className='flex flex-col w-full '>
								<Listbox
									aria-label="Avoid"
									color='success'
									variant="bordered"
									selectionMode="multiple"
									selectedKeys={selectedAvoidKeys}
									onSelectionChange={(e) => setSelectedAvoidKeys(e as any)}
								>
									<ListboxSection title='Avoid' >
										<ListboxItem key="highways">Highways</ListboxItem>
										<ListboxItem key="tollways">Tollways</ListboxItem>
										<ListboxItem key="ferries">Ferries</ListboxItem>
									</ListboxSection>
								</Listbox>
								<Select
									size={'md'}
									label="Units"
									color='default'
									defaultSelectedKeys={[selectedUnit]}
									placeholder="Select unit"
									onChange={(e) => setSelectedUnit(e.target.value as UnitsType)}
									listboxProps={{
										color: "default",
										classNames: { base: 'dark' }
									}}
									popoverProps={{
										classNames: { base: 'dark text-foreground' }
									}}
									className='pl-2 pr-2'
								>
									{units.map((unit) => (
										<SelectItem key={unit} value={unit}>
											{unit}
										</SelectItem>
									))}
								</Select>
							</div>

							<div className='border-r-1 border-r-[#313134]'></div>
							<div className='flex flex-col w-full pb-2'>
								<Listbox
									aria-label="Preference"
									variant="bordered"
									disallowEmptySelection
									defaultSelectedKeys={['recommended']}
									selectionMode="single"
									color='success'
									selectedKeys={selectedPreferenceKeys}
									onSelectionChange={(e) => setSelectedPreferenceKeys(e as any)}
								>
									<ListboxSection title='Preference' >
										<ListboxItem key="recommended">Recommended</ListboxItem>
										<ListboxItem key="fastest">Fastest</ListboxItem>
										<ListboxItem key="shortest">Shortest</ListboxItem>
									</ListboxSection>
								</Listbox>
								<Input label='Maximum speed' className='pl-2  pr-2' value={maximumSpeed} onChange={(e) => setMaximumSpeed(e.target.value)} />
							</div>
						</div>


					</motion.div>
				)}
			</AnimatePresence>
		</Card>
	);
};

export default MyComponent;
