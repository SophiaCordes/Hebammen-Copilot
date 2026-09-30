INSERT INTO tenants (id, name, slug, status)
VALUES ('demo-tenant', 'Midwife App Demo Clinic', 'demo-clinic', 'active')
ON CONFLICT(id) DO NOTHING;
