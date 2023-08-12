PGDMP     -                     {            smv_Proveedores    15.3    15.3 B    e           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            f           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            g           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            h           1262    34551    smv_Proveedores    DATABASE     �   CREATE DATABASE "smv_Proveedores" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Spanish_Mexico.1252';
 !   DROP DATABASE "smv_Proveedores";
                postgres    false            �            1255    34669 3   delete_provider_profile(integer, character varying)    FUNCTION     @  CREATE FUNCTION public.delete_provider_profile(_id integer, responsible_user character varying) RETURNS void
    LANGUAGE plpgsql
    AS $$
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

$$;
 _   DROP FUNCTION public.delete_provider_profile(_id integer, responsible_user character varying);
       public          postgres    false            �            1255    34668    insert_provider_profile(integer, character varying, character varying, integer, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying)    FUNCTION     g  CREATE FUNCTION public.insert_provider_profile(provider_id integer, provider_name character varying, social_reason character varying, discount_sale integer, _address character varying, _col character varying, _rfc character varying, _city character varying, _state character varying, postal_code character varying, _country character varying, _contact character varying, _phone character varying, _email character varying, responsible_user character varying) RETURNS integer
    LANGUAGE plpgsql
    AS $$
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
$$;
 �  DROP FUNCTION public.insert_provider_profile(provider_id integer, provider_name character varying, social_reason character varying, discount_sale integer, _address character varying, _col character varying, _rfc character varying, _city character varying, _state character varying, postal_code character varying, _country character varying, _contact character varying, _phone character varying, _email character varying, responsible_user character varying);
       public          postgres    false            �            1255    34667    update_provider_profile(integer, character varying, character varying, integer, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying)    FUNCTION     9  CREATE FUNCTION public.update_provider_profile(_id integer, provider_name character varying, social_reason character varying, discount_sale integer, _address character varying, _col character varying, _rfc character varying, _city character varying, _state character varying, postal_code character varying, _country character varying, _contact character varying, _phone character varying, _email character varying, responsible_user character varying) RETURNS void
    LANGUAGE plpgsql
    AS $$
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
$$;
 �  DROP FUNCTION public.update_provider_profile(_id integer, provider_name character varying, social_reason character varying, discount_sale integer, _address character varying, _col character varying, _rfc character varying, _city character varying, _state character varying, postal_code character varying, _country character varying, _contact character varying, _phone character varying, _email character varying, responsible_user character varying);
       public          postgres    false            �            1255    34645    update_updated_at_column()    FUNCTION     h  CREATE FUNCTION public.update_updated_at_column() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
    BEGIN
        IF NEW."isDeleted" <> OLD."isDeleted" THEN
            UPDATE "userAuth"
            SET "isDeleted" = NEW."isDeleted", "updated_At" = now()
            WHERE "id" = OLD."providerId";
            END IF;
            RETURN NEW;
    END;
    $$;
 1   DROP FUNCTION public.update_updated_at_column();
       public          postgres    false            �            1259    34593    Permissions    TABLE     �  CREATE TABLE public."Permissions" (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    permission character varying(100) NOT NULL,
    reference character varying(11),
    estatus character varying(100) DEFAULT 'Activo'::character varying NOT NULL,
    "created_At" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    "updated_At" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    "isDeleted" boolean DEFAULT false
);
 !   DROP TABLE public."Permissions";
       public         heap    postgres    false            �            1259    34592    Permissions_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Permissions_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public."Permissions_id_seq";
       public          postgres    false    221            i           0    0    Permissions_id_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public."Permissions_id_seq" OWNED BY public."Permissions".id;
          public          postgres    false    220            �            1259    34567    distributorsProfile    TABLE     �  CREATE TABLE public."distributorsProfile" (
    id integer NOT NULL,
    "distributorId" integer NOT NULL,
    "distributorName" character varying(100) NOT NULL,
    address character varying(100),
    col character varying(100),
    city character varying(100),
    state character varying(100),
    "postalCode" character varying(100),
    country character varying(100),
    contact character varying(200),
    phone character varying(100) NOT NULL,
    email character varying(100) NOT NULL,
    "created_At" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    "updated_At" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    "isDeleted" boolean DEFAULT false
);
 )   DROP TABLE public."distributorsProfile";
       public         heap    postgres    false            �            1259    34566    distributorsProfile_id_seq    SEQUENCE     �   CREATE SEQUENCE public."distributorsProfile_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 3   DROP SEQUENCE public."distributorsProfile_id_seq";
       public          postgres    false    217            j           0    0    distributorsProfile_id_seq    SEQUENCE OWNED BY     ]   ALTER SEQUENCE public."distributorsProfile_id_seq" OWNED BY public."distributorsProfile".id;
          public          postgres    false    216            �            1259    34625    providerProductsAvailability    TABLE     �  CREATE TABLE public."providerProductsAvailability" (
    "productId" integer NOT NULL,
    "productStock" integer NOT NULL,
    "productMin" integer NOT NULL,
    "productMax" integer NOT NULL,
    "availabilityCat" character varying(100) NOT NULL,
    "created_At" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    "updated_At" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    "isDeleted" boolean DEFAULT false
);
 2   DROP TABLE public."providerProductsAvailability";
       public         heap    postgres    false            �            1259    34634    providersLog    TABLE     �  CREATE TABLE public."providersLog" (
    id integer NOT NULL,
    "responsibleUser" character varying(100),
    "affectedTable" character varying(100) NOT NULL,
    action character varying(100) NOT NULL,
    "oldData" jsonb,
    "newData" jsonb,
    "created_At" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    "updated_At" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    "isDeleted" boolean DEFAULT false
);
 "   DROP TABLE public."providersLog";
       public         heap    postgres    false            �            1259    34633    providersLog_id_seq    SEQUENCE     �   CREATE SEQUENCE public."providersLog_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public."providersLog_id_seq";
       public          postgres    false    228            k           0    0    providersLog_id_seq    SEQUENCE OWNED BY     O   ALTER SEQUENCE public."providersLog_id_seq" OWNED BY public."providersLog".id;
          public          postgres    false    227            �            1259    34553    providersProfile    TABLE     �  CREATE TABLE public."providersProfile" (
    id integer NOT NULL,
    "providerId" integer NOT NULL,
    "providerName" character varying(100) NOT NULL,
    "socialReason" character varying(100) NOT NULL,
    "discountSale" integer DEFAULT 0,
    "referenceCode" character varying(11) DEFAULT lpad(to_hex((floor((random() * ('10000000000'::bigint)::double precision)))::bigint), 10, '0'::text),
    address character varying(100),
    col character varying(100),
    rfc character varying(100) NOT NULL,
    city character varying(100),
    state character varying(100),
    "postalCode" character varying(100),
    country character varying(100),
    contact character varying(200),
    phone character varying(100) NOT NULL,
    email character varying(100) NOT NULL,
    "created_At" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    "updated_At" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    "isDeleted" boolean DEFAULT false
);
 &   DROP TABLE public."providersProfile";
       public         heap    postgres    false            �            1259    34552    providersProfile_id_seq    SEQUENCE     �   CREATE SEQUENCE public."providersProfile_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 0   DROP SEQUENCE public."providersProfile_id_seq";
       public          postgres    false    215            l           0    0    providersProfile_id_seq    SEQUENCE OWNED BY     W   ALTER SEQUENCE public."providersProfile_id_seq" OWNED BY public."providersProfile".id;
          public          postgres    false    214            �            1259    34614 
   pvProducts    TABLE     �  CREATE TABLE public."pvProducts" (
    id integer NOT NULL,
    "providerId" integer NOT NULL,
    "productName" character varying(100) NOT NULL,
    "manofacturerCode" character varying(100) NOT NULL,
    "companyCode" character varying(100),
    brand character varying(100),
    model character varying(100),
    "retailPrice" double precision,
    "wholesalePrice" double precision,
    "satProductCode" character varying(100) NOT NULL,
    "satUnitCode" character varying(100) NOT NULL,
    "unitMeasurement" character varying(100),
    "created_At" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    "updated_At" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    "isDeleted" boolean DEFAULT false
);
     DROP TABLE public."pvProducts";
       public         heap    postgres    false            �            1259    34613    pvProducts_id_seq    SEQUENCE     �   CREATE SEQUENCE public."pvProducts_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public."pvProducts_id_seq";
       public          postgres    false    225            m           0    0    pvProducts_id_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public."pvProducts_id_seq" OWNED BY public."pvProducts".id;
          public          postgres    false    224            �            1259    34579    userAuth    TABLE     �  CREATE TABLE public."userAuth" (
    id integer NOT NULL,
    "userName" character varying(100) NOT NULL,
    password character varying(100) NOT NULL,
    "isPasswordModified" boolean DEFAULT false,
    "isVerified" boolean DEFAULT false,
    "refreshToken" character varying(200),
    "created_At" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    "updated_At" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    "isDeleted" boolean DEFAULT false
);
    DROP TABLE public."userAuth";
       public         heap    postgres    false            �            1259    34578    userAuth_id_seq    SEQUENCE     �   CREATE SEQUENCE public."userAuth_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public."userAuth_id_seq";
       public          postgres    false    219            n           0    0    userAuth_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public."userAuth_id_seq" OWNED BY public."userAuth".id;
          public          postgres    false    218            �            1259    34604    verifyToken    TABLE     w  CREATE TABLE public."verifyToken" (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    token character varying(200) NOT NULL,
    "expireTime" timestamp without time zone NOT NULL,
    "created_At" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    "updated_At" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    "isDeleted" boolean DEFAULT false
);
 !   DROP TABLE public."verifyToken";
       public         heap    postgres    false            �            1259    34603    verifyToken_id_seq    SEQUENCE     �   CREATE SEQUENCE public."verifyToken_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public."verifyToken_id_seq";
       public          postgres    false    223            o           0    0    verifyToken_id_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public."verifyToken_id_seq" OWNED BY public."verifyToken".id;
          public          postgres    false    222            �           2604    34596    Permissions id    DEFAULT     t   ALTER TABLE ONLY public."Permissions" ALTER COLUMN id SET DEFAULT nextval('public."Permissions_id_seq"'::regclass);
 ?   ALTER TABLE public."Permissions" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    220    221    221            �           2604    34570    distributorsProfile id    DEFAULT     �   ALTER TABLE ONLY public."distributorsProfile" ALTER COLUMN id SET DEFAULT nextval('public."distributorsProfile_id_seq"'::regclass);
 G   ALTER TABLE public."distributorsProfile" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    216    217    217            �           2604    34637    providersLog id    DEFAULT     v   ALTER TABLE ONLY public."providersLog" ALTER COLUMN id SET DEFAULT nextval('public."providersLog_id_seq"'::regclass);
 @   ALTER TABLE public."providersLog" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    227    228    228            �           2604    34556    providersProfile id    DEFAULT     ~   ALTER TABLE ONLY public."providersProfile" ALTER COLUMN id SET DEFAULT nextval('public."providersProfile_id_seq"'::regclass);
 D   ALTER TABLE public."providersProfile" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    215    214    215            �           2604    34617    pvProducts id    DEFAULT     r   ALTER TABLE ONLY public."pvProducts" ALTER COLUMN id SET DEFAULT nextval('public."pvProducts_id_seq"'::regclass);
 >   ALTER TABLE public."pvProducts" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    224    225    225            �           2604    34582    userAuth id    DEFAULT     n   ALTER TABLE ONLY public."userAuth" ALTER COLUMN id SET DEFAULT nextval('public."userAuth_id_seq"'::regclass);
 <   ALTER TABLE public."userAuth" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    219    218    219            �           2604    34607    verifyToken id    DEFAULT     t   ALTER TABLE ONLY public."verifyToken" ALTER COLUMN id SET DEFAULT nextval('public."verifyToken_id_seq"'::regclass);
 ?   ALTER TABLE public."verifyToken" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    223    222    223            [          0    34593    Permissions 
   TABLE DATA           ~   COPY public."Permissions" (id, "userId", permission, reference, estatus, "created_At", "updated_At", "isDeleted") FROM stdin;
    public          postgres    false    221   +r       W          0    34567    distributorsProfile 
   TABLE DATA           �   COPY public."distributorsProfile" (id, "distributorId", "distributorName", address, col, city, state, "postalCode", country, contact, phone, email, "created_At", "updated_At", "isDeleted") FROM stdin;
    public          postgres    false    217   �r       `          0    34625    providerProductsAvailability 
   TABLE DATA           �   COPY public."providerProductsAvailability" ("productId", "productStock", "productMin", "productMax", "availabilityCat", "created_At", "updated_At", "isDeleted") FROM stdin;
    public          postgres    false    226   �s       b          0    34634    providersLog 
   TABLE DATA           �   COPY public."providersLog" (id, "responsibleUser", "affectedTable", action, "oldData", "newData", "created_At", "updated_At", "isDeleted") FROM stdin;
    public          postgres    false    228   �s       U          0    34553    providersProfile 
   TABLE DATA           �   COPY public."providersProfile" (id, "providerId", "providerName", "socialReason", "discountSale", "referenceCode", address, col, rfc, city, state, "postalCode", country, contact, phone, email, "created_At", "updated_At", "isDeleted") FROM stdin;
    public          postgres    false    215   �s       _          0    34614 
   pvProducts 
   TABLE DATA           �   COPY public."pvProducts" (id, "providerId", "productName", "manofacturerCode", "companyCode", brand, model, "retailPrice", "wholesalePrice", "satProductCode", "satUnitCode", "unitMeasurement", "created_At", "updated_At", "isDeleted") FROM stdin;
    public          postgres    false    225   �t       Y          0    34579    userAuth 
   TABLE DATA           �   COPY public."userAuth" (id, "userName", password, "isPasswordModified", "isVerified", "refreshToken", "created_At", "updated_At", "isDeleted") FROM stdin;
    public          postgres    false    219   �t       ]          0    34604    verifyToken 
   TABLE DATA           s   COPY public."verifyToken" (id, "userId", token, "expireTime", "created_At", "updated_At", "isDeleted") FROM stdin;
    public          postgres    false    223   �v       p           0    0    Permissions_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public."Permissions_id_seq"', 9, true);
          public          postgres    false    220            q           0    0    distributorsProfile_id_seq    SEQUENCE SET     J   SELECT pg_catalog.setval('public."distributorsProfile_id_seq"', 2, true);
          public          postgres    false    216            r           0    0    providersLog_id_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public."providersLog_id_seq"', 1, false);
          public          postgres    false    227            s           0    0    providersProfile_id_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public."providersProfile_id_seq"', 6, true);
          public          postgres    false    214            t           0    0    pvProducts_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public."pvProducts_id_seq"', 1, false);
          public          postgres    false    224            u           0    0    userAuth_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public."userAuth_id_seq"', 9, true);
          public          postgres    false    218            v           0    0    verifyToken_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public."verifyToken_id_seq"', 4, true);
          public          postgres    false    222            �           2606    34602    Permissions Permissions_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public."Permissions"
    ADD CONSTRAINT "Permissions_pkey" PRIMARY KEY (id);
 J   ALTER TABLE ONLY public."Permissions" DROP CONSTRAINT "Permissions_pkey";
       public            postgres    false    221            �           2606    34577 ,   distributorsProfile distributorsProfile_pkey 
   CONSTRAINT     n   ALTER TABLE ONLY public."distributorsProfile"
    ADD CONSTRAINT "distributorsProfile_pkey" PRIMARY KEY (id);
 Z   ALTER TABLE ONLY public."distributorsProfile" DROP CONSTRAINT "distributorsProfile_pkey";
       public            postgres    false    217            �           2606    34632 G   providerProductsAvailability providerProductsAvailability_productId_key 
   CONSTRAINT     �   ALTER TABLE ONLY public."providerProductsAvailability"
    ADD CONSTRAINT "providerProductsAvailability_productId_key" UNIQUE ("productId");
 u   ALTER TABLE ONLY public."providerProductsAvailability" DROP CONSTRAINT "providerProductsAvailability_productId_key";
       public            postgres    false    226            �           2606    34644    providersLog providersLog_pkey 
   CONSTRAINT     `   ALTER TABLE ONLY public."providersLog"
    ADD CONSTRAINT "providersLog_pkey" PRIMARY KEY (id);
 L   ALTER TABLE ONLY public."providersLog" DROP CONSTRAINT "providersLog_pkey";
       public            postgres    false    228            �           2606    34565 &   providersProfile providersProfile_pkey 
   CONSTRAINT     h   ALTER TABLE ONLY public."providersProfile"
    ADD CONSTRAINT "providersProfile_pkey" PRIMARY KEY (id);
 T   ALTER TABLE ONLY public."providersProfile" DROP CONSTRAINT "providersProfile_pkey";
       public            postgres    false    215            �           2606    34624    pvProducts pvProducts_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public."pvProducts"
    ADD CONSTRAINT "pvProducts_pkey" PRIMARY KEY (id);
 H   ALTER TABLE ONLY public."pvProducts" DROP CONSTRAINT "pvProducts_pkey";
       public            postgres    false    225            �           2606    34589    userAuth userAuth_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public."userAuth"
    ADD CONSTRAINT "userAuth_pkey" PRIMARY KEY (id);
 D   ALTER TABLE ONLY public."userAuth" DROP CONSTRAINT "userAuth_pkey";
       public            postgres    false    219            �           2606    34591    userAuth userAuth_userName_key 
   CONSTRAINT     c   ALTER TABLE ONLY public."userAuth"
    ADD CONSTRAINT "userAuth_userName_key" UNIQUE ("userName");
 L   ALTER TABLE ONLY public."userAuth" DROP CONSTRAINT "userAuth_userName_key";
       public            postgres    false    219            �           2606    34612    verifyToken verifyToken_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public."verifyToken"
    ADD CONSTRAINT "verifyToken_pkey" PRIMARY KEY (id);
 J   ALTER TABLE ONLY public."verifyToken" DROP CONSTRAINT "verifyToken_pkey";
       public            postgres    false    223            �           2620    34646 6   providersProfile update_isdeleted_userauth_profileprov    TRIGGER     �   CREATE TRIGGER update_isdeleted_userauth_profileprov AFTER UPDATE ON public."providersProfile" FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
 Q   DROP TRIGGER update_isdeleted_userauth_profileprov ON public."providersProfile";
       public          postgres    false    229    215            �           2606    34657 #   Permissions fk_permissions_provider    FK CONSTRAINT     �   ALTER TABLE ONLY public."Permissions"
    ADD CONSTRAINT fk_permissions_provider FOREIGN KEY ("userId") REFERENCES public."userAuth"(id);
 O   ALTER TABLE ONLY public."Permissions" DROP CONSTRAINT fk_permissions_provider;
       public          postgres    false    221    219    3252            �           2606    34652 ,   distributorsProfile fk_profile_distributorli    FK CONSTRAINT     �   ALTER TABLE ONLY public."distributorsProfile"
    ADD CONSTRAINT fk_profile_distributorli FOREIGN KEY ("distributorId") REFERENCES public."userAuth"(id);
 X   ALTER TABLE ONLY public."distributorsProfile" DROP CONSTRAINT fk_profile_distributorli;
       public          postgres    false    3252    217    219            �           2606    34647 $   providersProfile fk_profile_userauth    FK CONSTRAINT     �   ALTER TABLE ONLY public."providersProfile"
    ADD CONSTRAINT fk_profile_userauth FOREIGN KEY ("providerId") REFERENCES public."userAuth"(id);
 P   ALTER TABLE ONLY public."providersProfile" DROP CONSTRAINT fk_profile_userauth;
       public          postgres    false    219    215    3252            �           2606    34662    verifyToken fk_verify_provider    FK CONSTRAINT     �   ALTER TABLE ONLY public."verifyToken"
    ADD CONSTRAINT fk_verify_provider FOREIGN KEY ("userId") REFERENCES public."userAuth"(id);
 J   ALTER TABLE ONLY public."verifyToken" DROP CONSTRAINT fk_verify_provider;
       public          postgres    false    223    3252    219            [   �   x���1
AE��)� ��3�L&鼀'�N�l�fٻ���>��12�4g��D�����QE�c�ϵ#T�7f�_�2�U���C_���-p�M����^��7a�!�#�%��;����a���-��Xq���e��'^�7�      W   �   x��ϱ�0���2���TH Q� Js�
>�8��,��APѼ�o�����!���Z�`�τ��Q?�;ؒ��Y�ԥ2���.l��#�(3�ZU�����w%,�'�>�rTXLU=Uf�8�j���.�(g��.C��.!��IЉ���ƿ�������6]9:G!����&ϲ��M`�      `      x������ � �      b      x������ � �      U   �   x�}�1�0@��)� ��Ka�hB��11�R#�R��7�^Lf�7��=9T�l��3)D�(�ZHX������=����[@��Տ)�T#�܎w6<X�
�0����l����6���ZV���5�F�N�q��˫7mj��$�,b�R�R�T	����.�1���=<      _      x������ � �      Y   	  x����n�@��s�դi6�S�7���!` �4j��Ylc����a�H�������>�<�S���:�δ{I*��L@��$O,x�}����xJ���ԻC������
�8�-���k�p*��SH&��Dw-�wAv�4d����Qm
�
��h��J�����ݯ����GPc�9Z9BI\�J�;��_	�A�_i���!�����x��e��:�u�����d�
���<lK�K��u��
`��lo)Q7M�������|�.Xq�Ɍ $�律�4�/���U��KJϟ��*��2�U�ڢ%{�d&}6��zZ�������`k�f��y��U�z��M������ؔ8�Ń�eCF�-@9�Ἰ�����e�.����Z��*e&q���+Se?ߑ"���s���z?�a�Ǜ^���Q�Y
,x��y~E�7���I��c:���7tR`y/����	-x=F��H%0����j.ҥ��J%�$�����>�/x����wQ<�`���/˼��      ]      x������ � �     