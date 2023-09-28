create database "smv_Proveedores";

\c smv_Proveedores;

create table "providersProfile" (
    "id" serial primary key,
    "providerId" int not null,
    "providerName" varchar(100) not null,
    "socialReason" varchar(100) not null,
    "discountSale" int DEFAULT 0,
    "referenceCode" varchar(11) DEFAULT LPAD(TO_HEX(FLOOR(RANDOM() * 10000000000)::bigint), 10, '0'),
    "address" varchar(100),
    "col" varchar(100),
    "rfc" varchar(100) not null,
    "city" varchar(100),
    "state" varchar(100),
    "postalCode" varchar(100),
    "country" varchar(100),
    "contact" varchar(200),
    "phone" varchar(100) not null,
    "email" varchar(100) not null,
    "created_At" timestamp default current_timestamp,
    "updated_At" timestamp default current_timestamp,
    "isDeleted" boolean default false 
);

create table "UsersProfile"
(
    "id" serial primary key,
    "profileId" int not null,
    "profileName" varchar(100) not null,
    "address" varchar(100),
    "col" varchar(100),
    "city" varchar(100),
    "state" varchar(100),
    "postalCode" varchar(100),
    "country" varchar(100),
    "contact" varchar(200),
    "phone" varchar(100) not null,
    "email" varchar(100) not null,
    "created_At" timestamp default current_timestamp,
    "updated_At" timestamp default current_timestamp,
    "isDeleted" boolean default false 
);

-- me fui a comer pero aqui estaba haciendo el listado de proveedores donde se mostrará el nombre de la empresa, la razon social, el rfc, la ciudad, el estado, el pais, los productos y las accieones (CRUD

-- el nombre de usuario para iniciar sesion es el correo electronico de providersProfile
create table "userAuth" (
    "id" serial primary key,
    "userName" varchar(100) not null unique,
    "password" varchar(100) not null,
    "isPasswordModified" boolean default false,
    "isVerified" boolean default false,
    "created_At" timestamp default current_timestamp,
    "updated_At" timestamp default current_timestamp,
    "isDeleted" boolean default false
);

create table "userImages"
(
    "id" serial primary key,
    "userId" int not null,
    "image" BYTEA,
    "created_At" timestamp default current_timestamp,
    "updated_At" timestamp default current_timestamp,
    "isDeleted" boolean default false 
);



create table "Permissions" (
    "id" serial primary key,
    "userId" int not null unique,
    "permission" varchar(100) not null,
    "reference" varchar(11),
    "estatus" varchar(100) not null default 'Activo',
    "created_At" timestamp default current_timestamp,
    "updated_At" timestamp default current_timestamp,
    "isDeleted" boolean default false
);

create table "verifyToken" (
    "id" serial primary key,
    "userId" int not null,
    "token" varchar(200) not null,
    "expireTime" timestamp not null,
    "created_At" timestamp default current_timestamp,
    "updated_At" timestamp default current_timestamp,
    "isDeleted" boolean default false
);

create table "pvProducts" (
    "id" serial primary key,
    "providerId" int not null,
    "productName" varchar(100) not null,
    "manofacturerCode" varchar(100) not null,
    "companyCode" varchar(100),
    "brand" varchar(100),
    "model" varchar(100),
    "price1" float,
    "price2" float,
    "price3" float,
    "price4" float,
    "rate1" float,
    "rate2" float,
    "rate3" float,
    "satProductCode" varchar(100) not null,
    "satUnitCode" varchar(100) not null,
    "unitMeasurement" varchar(100),
    "created_At" timestamp default current_timestamp,
    "updated_At" timestamp default current_timestamp,
    "isDeleted" boolean default false
);

create table "pvProductsImages" (
    "id" serial primary key,
    "productId" int not null,
    "image1" BYTEA,
    "image2" BYTEA,
    "image3" BYTEA,
    "image4" BYTEA,
    "created_At" timestamp default current_timestamp,
    "updated_At" timestamp default current_timestamp,
    "isDeleted" boolean default false
);

create table "technicalSheetProducts"
(
    "id" serial primary key,
    "productId" int not null,
    "tecnicalSheet" BYTEA,
    "created_At" timestamp default current_timestamp,
    "updated_At" timestamp default current_timestamp,
    "isDeleted" boolean default false 
);


-- Al listar productos, ademas de las funciones CRUD, se agregaran acciones para facilitar la gestion de estos, una de estas funciones es poder poder gestionar la disponibilidad de los productos
-- Esta función se realizara con un boton que se llamara "Gestionar disponibilidad" y mostrara una tabla con los productos, la cantidad disponible, la cantidad minima y la cantidad maxima
-- Se dispondra de tres categorias de disponibilidad de productos, la primera es "Disponible", la segunda es "Agotado" y la tercera es "Por agotarse" y seran representadas con colores para facilitar su identificacion (verde, rojo y amarillo)
-- para esto se creara una tabla que se llamara providerProductsAvailability, en esta tabla se mostrara el nombre del producto, la cantidad disponible, la cantidad minima y la cantidad maxima


create table "ProductsAvailability" (
    "productId" int not null unique,
    "productStock" int not null,
    "productMin" int not null,
    "productMax" int not null,
    "availabilityCat" varchar(100) not null,
    "created_At" timestamp default current_timestamp,
    "updated_At" timestamp default current_timestamp,
    "isDeleted" boolean default false
);


--tal vez se elimine esta tabla y se agregue el campo "estatus" a la tabla providerOrders

create table "pvOrders" (
    "id" serial primary key,
    "responsibleId" int not null,
    "costumerId" varchar(100) not null,
    "orderDate" timestamp not null,
    "orderType" varchar(100) not null,
    "facture" varchar(50) DEFAULT CONCAT('C-', LPAD(TO_HEX(FLOOR(RANDOM() * 10000000000)::bigint), 10, '0')) UNIQUE,
    "fulfilled" boolean default false,
    "created_At" timestamp default current_timestamp,
    "updated_At" timestamp default current_timestamp,
    "isDeleted" boolean default false
);

create table "pvOrdersDetails" (
    "id" serial primary key,
    "orderId" int not null,
    --productQuantity es un arreglo que contiene la cantidad de productos que se ordenaron y el id de cada producto
    "productQuantity" integer[] not null,
    "amountPaid" float not null,
    "amountPending" float not null,
    "discount" float not null,
    "Total" float not null,
    "orderData" varchar(100) not null,
    "deliveryData" varchar(100) not null,
    "paymentMethod" varchar(100) not null,
    "comments" varchar(100),
    "created_At" timestamp default current_timestamp,
    "updated_At" timestamp default current_timestamp,
    "isDeleted" boolean default false
);

alter table "pvOrdersDetails"
add constraint fk_orderDetails_order foreign key ("orderId") references "pvOrders" ("id");



create table "providersLog" (
    "id" serial primary key,
    "responsibleUser" varchar(100),
    "affectedTable" varchar(100) not null,
    "action" varchar(100) not null,
    "oldData" JSONB,
    "newData" JSONB,
    "created_At" timestamp default current_timestamp,
    "updated_At" timestamp default current_timestamp,
    "isDeleted" boolean default false
);

------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION update_updated_at_column()
    RETURNS TRIGGER
    AS $$
    BEGIN
        IF NEW."isDeleted" <> OLD."isDeleted" THEN
            UPDATE "userAuth"
            SET "isDeleted" = NEW."isDeleted", "updated_At" = now()
            WHERE "id" = OLD."providerId";
            END IF;
            RETURN NEW;
    END;
    $$
    LANGUAGE plpgsql;

CREATE TRIGGER update_isDeleted_userAuth_profileProv
    AFTER UPDATE
    ON "providersProfile"
    FOR EACH ROW
    EXECUTE PROCEDURE update_updated_at_column();


------------------------------------------------------------------------------- funcion para actualizar la tabla providersLI, cuando se actualice la tabla providersProfile -----------------------------------------------------------------------------------------------------------------

alter table "providersProfile"
add constraint fk_profile_userAuth foreign key ("providerId") references "userAuth" ("id");

alter table "UsersProfile"
add constraint fk_profile_userAuth foreign key ("profileId") references "userAuth" ("id");

alter table "pvProducts"
add constraint fk_prod_profile foreign key ("providerId") references "providersProfile" ("id");

alter table "Permissions"
add constraint fk_permissions_provider foreign key ("userId") references "userAuth" ("id");

alter table "verifyToken"
add constraint fk_verify_provider foreign key ("userId") references "userAuth" ("id");

alter table "userImages"
add constraint fk_userImages_userAuth foreign key ("userId") references "userAuth" ("id");

alter table "pvProducts"
add constraint fk_prod_provider foreign key ("providerId") references "providersProfile" ("id");

alter table "pvProductsImages"
add constraint fk_prodImg_prod foreign key ("productId") references "pvProducts" ("id");

alter table "technicalSheetProducts"
add constraint fk_tecSheet_prod foreign key ("productId") references "pvProducts" ("id");

------------------------------------------------------------------------------------   Llaves foraneas   ------------------------------------------------------------------------------------------------------------


CREATE OR REPLACE FUNCTION update_provider_profile(
	_id INT,
    provider_name VARCHAR(100),
    social_reason VARCHAR(100),
    discount_sale INT,
    _address VARCHAR(100),
    _col VARCHAR(100),
    _rfc VARCHAR(100),
    _city VARCHAR(100),
    _state VARCHAR(100),
    postal_code VARCHAR(100),
    _country VARCHAR(100),
    _contact VARCHAR(200),
    _phone VARCHAR(100),
    _email VARCHAR(100),
    responsible_user VARCHAR(100)
)
RETURNS VOID AS $$
DECLARE
    provId INT;
    old_data JSONB;
    new_data JSONB;
BEGIN
    old_data := to_jsonb(t)
    FROM "providersProfile" t
    WHERE "id" = _id;

    UPDATE "providersProfile"
    SET
        "providerName" = provider_name,
        "socialReason" = social_reason,
        "discountSale" = discount_sale,
        "address" = _address,
        "col" = _col,
        "rfc" = _rfc,
        "city" = _city,
        "state" = _state,
        "postalCode" = postal_code,
        "country" = _country,
        "contact" = _contact,
        "phone" = _phone,
        "email" = _email,
        "updated_At" = current_timestamp
    WHERE "id" = _id RETURNING "providerId" INTO provId;

    new_data := jsonb_build_object(
        'id', _id,
        'providerId', provId,
        'providerName', provider_name,
        'socialReason', social_reason,
        'discountSale', discount_sale,
        'address', _address,
        'col', _col,
        'rfc', _rfc,
        'city', _city,
        'state', _state,
        'postalCode', postal_code,
        'country', _country,
        'contact', _contact,
        'phone', _phone,
        'email', _email
    );

    INSERT INTO "providersLog" ("responsibleUser", "affectedTable", "action", "oldData", "newData")
    VALUES (responsible_user, 'providersProfile', 'update', old_data, new_data);

    RETURN;
END;
$$ LANGUAGE plpgsql;



CREATE OR REPLACE FUNCTION insert_provider_profile(
    provider_id INT,
    provider_name VARCHAR(100),
    social_reason VARCHAR(100),
    discount_sale INT,
    _address VARCHAR(100),
    _col VARCHAR(100),
    _rfc VARCHAR(100),
    _city VARCHAR(100),
    _state VARCHAR(100),
    postal_code VARCHAR(100),
    _country VARCHAR(100),
    _contact VARCHAR(200),
    _phone VARCHAR(100),
    _email VARCHAR(100),
    responsible_user VARCHAR(100)
)
RETURNS INT AS $$
DECLARE
    new_id INT;
    new_data JSONB;
BEGIN
    INSERT INTO "providersProfile" ("providerId", "providerName", "socialReason", "discountSale", "address", "col", "rfc", "city", "state", "postalCode", "country", "contact", "phone", "email")
    VALUES (provider_id, provider_name, social_reason, discount_sale, _address, _col, _rfc, _city, _state, postal_code, _country, _contact, _phone, _email) RETURNING "id" INTO new_id;
    
    new_data := jsonb_build_object(
        'id', new_id,
        'providerId', provider_id,
        'providerName', provider_name,
        'socialReason', social_reason,
        'discountSale', discount_sale,
        'address', _address,
        'col', _col,
        'rfc', _rfc,
        'city', _city,
        'state', _state,
        'postalCode', postal_code,
        'country', _country,
        'contact', _contact,
        'phone', _phone,
        'email', _email
    );
    
    INSERT INTO "providersLog" ("responsibleUser", "affectedTable", "action", "oldData", "newData")
    VALUES (responsible_user, 'providersProfile', 'insert', '{}'::JSONB, new_data);
    
    RETURN new_id;
END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION delete_provider_profile(
    _id INT,
    responsible_user VARCHAR(100)
)
RETURNS VOID AS $$
DECLARE
    old_data JSONB;
BEGIN
    old_data := to_jsonb(t)
    FROM "providersProfile" t
    WHERE "id" = _id;

    UPDATE "providersProfile"
    SET "isDeleted" = true, "updated_At" = current_timestamp
    WHERE "id" = _id;

    INSERT INTO "providersLog" ("responsibleUser", "affectedTable", "action", "oldData", "newData")
    VALUES (responsible_user, 'providersProfile', 'delete', old_data, '{}'::JSONB);

    RETURN;
END;

$$ LANGUAGE plpgsql;

