interface AnimationResponse {
  velocity: number
  distance: number
}

export const getAnimationDuration = (data: AnimationResponse): number => {
  const { velocity, distance } = data;
  return distance / velocity;
};
