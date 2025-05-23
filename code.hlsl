struct Light
{
  half3 direction;
  half3 color;
  float siatanceAttenuation;
  half shadowAttenuation;
  uint layerMask;
}