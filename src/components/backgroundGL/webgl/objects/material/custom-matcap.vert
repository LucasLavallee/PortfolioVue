#define MATCAP
// varying vec3 vViewPosition;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>

// instances attributes
attribute vec3 aPosition;
attribute vec3 aNormal;
attribute vec3 aTranslate;
attribute float aOffset;
attribute vec2 aUv;
attribute vec4 aOrientation;

varying vec3 vU;
varying vec3 vTranslate;

vec3 applyQuaternionToVector( vec4 q, vec3 v ){
  return v + 2.0 * cross( q.xyz, cross( q.xyz, v ) + q.w * v );
}

void main() {
	#include <uv_vertex>
  
  // vUv = aUv.xy;

	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
  transformedNormal = aNormal;
	#ifndef FLAT_SHADED // Normal computed with derivatives when FLAT_SHADED
		vNormal = normalize( transformedNormal );
	#endif
	#include <begin_vertex>

  vec3 instanceTranslate = aTranslate;
	vTranslate = aTranslate;
  vec4 instanceOrientation = aOrientation;

  vec3 vPosition = applyQuaternionToVector( instanceOrientation, aPosition );
  vec4 updatePosition = vec4( instanceTranslate + vPosition * aOffset, 1.0 );

	transformed = updatePosition.xyz;

	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>

	vec3 viewPosition = - mvPosition.xyz;
  vU = applyQuaternionToVector( vec4(-1., -1., -1., 1.) * instanceOrientation, viewPosition );
}