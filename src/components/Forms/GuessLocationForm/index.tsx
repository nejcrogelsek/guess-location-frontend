import { Avatar } from '@material-ui/core'
import axios from '../../../api/axios'
import { observer } from 'mobx-react-lite'
import { FC, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { ButtonStyled } from '../../shared/Button/styles'
import {
	Form,
	FormButtonsWrap,
	FormControl,
	FormControlSecondary,
	FormElement,
	FormErrorText,
	FormImagePlaceholder,
	FormLabel,
	FormMapWrapper,
} from '../../shared/Form/styles'
import { IGuessLocation } from '../../../interfaces/location.interface'
import ImagePlaceholder from '../../../assets/images/image-placeholder.png'

const GuessLocationForm: FC = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<IGuessLocation>()
	const onSubmit = handleSubmit((data) => {
		updateUser(data)
		reset()
	})

	const updateUser = async (updateUserDto: IGuessLocation) => {
		try {
			console.log('Guess location')
		} catch (err) {
			console.log(err)
		}
	}

	return (
		<>
			<Form onSubmit={onSubmit} className='relative guess'>
				<FormImagePlaceholder className='guess'>
					<img src={ImagePlaceholder} alt='' />
				</FormImagePlaceholder>
				<div className='form'>
					<FormElement>
						<FormMapWrapper id='map-canvas' className='small'></FormMapWrapper>
					</FormElement>
					<FormElement className='hidden'>
						<FormControl
							{...register('lat', { required: 'Latitude is required' })}
							name='lat'
							id='latitude'
							placeholder='lat'></FormControl>
						<FormControl
							{...register('lng', { required: 'Longitude is required' })}
							name='lng'
							id='longitude'
							placeholder='lng'></FormControl>
					</FormElement>
					<div className='results'>
						<FormElement className='error'>
							<FormLabel htmlFor='error-distance'>Error distance</FormLabel>
							<FormControlSecondary type='text' name='error-distance' />
						</FormElement>
						<FormElement className='location'>
							<FormLabel htmlFor='location'>Location</FormLabel>
							<FormControlSecondary type='text' name='location' />
						</FormElement>
					</div>
					<FormButtonsWrap className='buttons'>
						<ButtonStyled size='full' color='green' type='submit'>
							Guess
						</ButtonStyled>
					</FormButtonsWrap>
				</div>
			</Form>
		</>
	)
}

export default observer(GuessLocationForm)
