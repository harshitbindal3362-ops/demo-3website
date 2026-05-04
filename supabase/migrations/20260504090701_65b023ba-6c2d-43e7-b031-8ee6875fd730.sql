-- Fix search_path on trigger fn
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$;

-- Revoke direct EXECUTE on SECURITY DEFINER functions (still callable inside policies/triggers)
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, app_role) FROM anon, authenticated, public;
REVOKE EXECUTE ON FUNCTION public.handle_new_user_role() FROM anon, authenticated, public;

-- Replace public bucket listing with object-by-id read only
DROP POLICY IF EXISTS "Public read product images" ON storage.objects;
-- Public bucket auto-serves objects via the public URL endpoint without needing a SELECT policy.
-- Omitting the broad SELECT policy prevents directory-listing attacks.