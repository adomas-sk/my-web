export const divideByScalar = (vector, scalar) => {
	vector.set(vector.x / scalar, vector.y / scalar);
	return vector;
};

export const multiplyByScalar = (vector, scalar) => {
	vector.set(vector.x * scalar, vector.y * scalar);
	return vector;
};

export const setMagnitute = (vector, magnitute) => {
	return multiplyByScalar(vector.normalize(), magnitute);
};

export const limit = (vector, max) => {
	const { x, y } = vector;
	const magnituteSquare = Math.sqrt(x * x + y * y);

	if (magnituteSquare > max * max) {
		return multiplyByScalar(
			divideByScalar(vector, Math.sqrt(magnituteSquare)),
			max
		);
	}
	return vector;
};